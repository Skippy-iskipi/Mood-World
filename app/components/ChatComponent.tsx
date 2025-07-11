"use client"

import { useEffect, useState, useRef } from "react"
import { supabase } from '../../lib/supabaseClient'
import { ArrowLeft, Smile, Image, Send } from "lucide-react"

interface Message {
  id: string
  sender: string
  message: string
  created_at: string
  replied_to?: string | null
  image_url?: string | null
}

interface ChatComponentProps {
  role: 'user' | 'admin'
  onClose?: () => void
}

function formatTime(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function ChatComponent({ role, onClose }: ChatComponentProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [replyTarget, setReplyTarget] = useState<Message | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [openImageUrl, setOpenImageUrl] = useState<string | null>(null)

  // Fetch messages initially and subscribe to realtime
  useEffect(() => {
    fetchMessages()
    const channel = supabase.channel('messages').on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'messages' },
      () => fetchMessages()
    ).subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true })
    if (!error && data) setMessages(data as Message[])
  }

  const sendMessage = async () => {
    if (!input.trim() && !selectedImage) return
    setLoading(true)
    let imageUrl = null;
    if (selectedImage) {
      // 1. Upload to Supabase Storage with correct filePath and contentType
      const filePath = `public/${Date.now()}-${selectedImage.name}`;
      const { data, error } = await supabase.storage
        .from('chat-images')
        .upload(filePath, selectedImage, {
          cacheControl: '3600',
          upsert: false,
          contentType: selectedImage.type,
        });
      if (error) {
        alert('Image upload failed: ' + error.message);
        setLoading(false);
        return;
      }
      // 2. Get public URL using the same filePath
      const { data: publicUrlData } = supabase.storage
        .from('chat-images')
        .getPublicUrl(filePath);
      imageUrl = publicUrlData.publicUrl;
    }
    // 3. Save message with imageUrl
    await supabase.from('messages').insert([
      {
        sender: role,
        message: input,
        image_url: imageUrl,
        replied_to: replyTarget ? replyTarget.id : null
      }
    ]);
    setInput("")
    setSelectedImage(null)
    setImagePreview(null)
    setReplyTarget(null)
    setLoading(false)
  }

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const popularEmojis = ['😊', '❤️', '😍', '🥰', '😘', '😭', '😡', '😴', '🤔', '😅', '😂', '😢', '😤', '😌', '😇', '😋', '😎', '🤗', '😉', '😏']

  const handleEmojiSelect = (emoji: string) => {
    // Insert emoji at cursor position in input
    if (inputRef.current) {
      const start = inputRef.current.selectionStart || 0
      const end = inputRef.current.selectionEnd || 0
      const newValue = input.slice(0, start) + emoji + input.slice(end)
      setInput(newValue)
      // Move cursor after inserted emoji
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.selectionStart = inputRef.current.selectionEnd = start + emoji.length
        }
      }, 0)
    } else {
      setInput(input + emoji)
    }
    setShowEmojiPicker(false)
  }

  // Helper to get a message by ID
  const getMessageById = (id: string | null | undefined) => messages.find(m => m.id === id)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white/95 min-h-screen min-w-0 w-full max-w-full">
      <div className="relative w-full flex items-center justify-center h-16 border-b bg-white/90 shadow-sm">
        {onClose && (
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 md:p-4 border-2 border-pink-200 flex items-center justify-center hover:bg-white transition-all duration-300 touch-manipulation"
            onClick={onClose}
            aria-label="Back"
            style={{ minWidth: "48px", minHeight: "48px" }}
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
          </button>
        )}
        <span className="text-lg font-bold text-pink-700">Chat with Babe</span>
      </div>
      <div className="flex-1 overflow-y-auto space-y-2 p-2 sm:p-4 pb-32 sm:pb-28 w-full min-w-0">
        {messages.map(msg => {
          const isUser = msg.sender === 'user'
          const isMe = (role === 'user' && isUser) || (role === 'admin' && !isUser)
          const parentMsg = getMessageById(msg.replied_to)
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}> 
              <div className={`relative px-4 py-2 rounded-2xl max-w-[85vw] sm:max-w-[75%] text-sm shadow-md break-words
                ${isUser ? 'bg-pink-200 text-pink-900 rounded-br-md' : 'bg-blue-200 text-blue-900 rounded-bl-md'}`}
                style={{ marginBottom: 4 }}
              >
                {/* Reply preview above message */}
                {parentMsg && (
                  <div className="mb-1 px-2 py-1 rounded bg-gray-100 text-gray-600 text-xs border-l-4 border-pink-300 flex items-center gap-2 max-w-full">
                    {parentMsg.image_url && (
                      <img
                        src={parentMsg.image_url}
                        alt="reply preview"
                        className="w-8 h-8 object-cover rounded mr-1 border border-pink-200 flex-shrink-0 cursor-pointer"
                        onClick={() => setOpenImageUrl(parentMsg.image_url!)}
                      />
                    )}
                    <div className="truncate">
                      <span className="font-semibold">{parentMsg.sender === 'user' ? 'Sheikha' : 'Uel'}:</span>
                      {parentMsg.message && (
                        <span> {parentMsg.message.slice(0, 40)}{parentMsg.message.length > 40 ? '…' : ''}</span>
                      )}
                      {!parentMsg.message && parentMsg.image_url && (
                        <span> [Image]</span>
                      )}
                    </div>
                  </div>
                )}
                {/* Image */}
                {msg.image_url && (
                  <div className="mb-2">
                    <img 
                      src={msg.image_url} 
                      alt="Shared image" 
                      className="max-w-full h-auto rounded-lg max-h-48 object-cover cursor-pointer"
                      style={{ maxWidth: '60vw' }}
                      onClick={() => setOpenImageUrl(msg.image_url!)}
                    />
                  </div>
                )}
                {/* Text message */}
                {msg.message && <span>{msg.message}</span>}
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500">
                    {isUser ? 'Sheikha' : 'Uel'}
                  </span>
                  <span className="text-xs text-gray-400 ml-2">{formatTime(msg.created_at)}</span>
                  {/* Reply button */}
                  <button
                    className="ml-2 text-xs text-blue-500 hover:underline focus:outline-none"
                    onClick={() => setReplyTarget(msg)}
                    title="Reply"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>
      {/* Reply preview above input */}
      {replyTarget && (
        <div className="fixed bottom-16 left-0 w-full bg-pink-50 border-t border-pink-200 px-4 py-2 flex items-center z-50 gap-2">
          {replyTarget.image_url && (
            <img
              src={replyTarget.image_url}
              alt="reply preview"
              className="w-8 h-8 object-cover rounded border border-pink-200 flex-shrink-0 cursor-pointer"
              onClick={() => setOpenImageUrl(replyTarget.image_url!)}
            />
          )}
          <div className="flex-1 text-xs text-gray-700 truncate">
            Replying to <span className="font-semibold">{replyTarget.sender === 'user' ? 'Sheikha' : 'Uel'}</span>:
            {replyTarget.message && (
              <span> {replyTarget.message.slice(0, 40)}{replyTarget.message.length > 40 ? '…' : ''}</span>
            )}
            {!replyTarget.message && replyTarget.image_url && (
              <span> [Image]</span>
            )}
          </div>
          <button
            className="ml-2 text-xs text-gray-500 hover:text-red-500 focus:outline-none"
            onClick={() => setReplyTarget(null)}
            title="Cancel reply"
          >
            ×
          </button>
        </div>
      )}
      {/* Image Preview */}
      {imagePreview && (
        <div className="fixed bottom-24 left-2 right-2 bg-white/95 p-2 border-t border-gray-200 z-40 flex justify-center">
          <div className="relative inline-block">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="max-w-[60vw] max-h-32 object-cover rounded-lg"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
            >
              ×
            </button>
          </div>
        </div>
      )}
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="fixed bottom-24 left-2 right-2 bg-white/95 p-2 border-t border-gray-200 z-40">
          <div className="grid grid-cols-8 gap-2">
            {popularEmojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleEmojiSelect(emoji)}
                className="text-2xl hover:bg-gray-100 rounded-lg p-2 transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Image Modal/Lightbox */}
      {openImageUrl && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setOpenImageUrl(null)}
        >
          <div className="relative max-w-full max-h-full flex items-center justify-center">
            <img
              src={openImageUrl}
              alt="Full view"
              className="max-w-[90vw] max-h-[80vh] rounded-lg shadow-2xl border-4 border-white"
              onClick={e => e.stopPropagation()}
            />
            <button
              className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-700 rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold shadow"
              onClick={() => setOpenImageUrl(null)}
              aria-label="Close image preview"
            >
              ×
            </button>
          </div>
        </div>
      )}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 p-2 flex gap-1 border-t z-50 items-center max-w-full min-w-0">
        {/* Emoji Button */}
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-lg transition-colors flex-shrink-0"
          disabled={loading}
          style={{ minWidth: 40, minHeight: 40 }}
        >
          <Smile className="w-5 h-5" />
        </button>
        {/* Image Upload Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-lg transition-colors flex-shrink-0"
          disabled={loading}
          style={{ minWidth: 40, minHeight: 40 }}
        >
          <Image className="w-5 h-5" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
        />
        {/* Text Input */}
        <input
          ref={inputRef}
          className="flex-1 border rounded-lg px-3 py-2 text-base focus:outline-none focus:ring min-w-0 w-full"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={e => { if (e.key === 'Enter') sendMessage() }}
          disabled={loading}
          style={{ minWidth: 0 }}
        />
        {/* Send Button */}
        <button
          className="bg-blue-500 text-white px-3 py-2 rounded-lg font-semibold text-base disabled:opacity-50 hover:bg-blue-600 transition-colors flex-shrink-0"
          onClick={sendMessage}
          disabled={loading || (!input.trim() && !selectedImage)}
          style={{ minWidth: 40, minHeight: 40 }}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
} 