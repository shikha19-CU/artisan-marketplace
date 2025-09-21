"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader2, Wand2, Download, RefreshCw } from "lucide-react"

interface ImageGeneratorProps {
  onClose: () => void
  onImageGenerated: (imageUrl: string, prompt: string) => void
}

export default function ImageGenerator({ onClose, onImageGenerated }: ImageGeneratorProps) {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [generatedPrompt, setGeneratedPrompt] = useState("")

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)

    // Simulate AI image generation with a delay
    setTimeout(() => {
      // Generate a placeholder image with the prompt as query
      const imageUrl = `/placeholder.svg?height=512&width=512&query=${encodeURIComponent(prompt)}`
      setGeneratedImage(imageUrl)
      setGeneratedPrompt(prompt)
      setIsGenerating(false)
    }, 3000)
  }

  const handleUseImage = () => {
    if (generatedImage) {
      onImageGenerated(generatedImage, generatedPrompt)
      onClose()
    }
  }

  const handleRegenerate = () => {
    setGeneratedImage(null)
    handleGenerate()
  }

  const suggestedPrompts = [
    "Traditional Indian brass lamp with intricate carvings",
    "Handwoven silk fabric with golden threads and paisley patterns",
    "Wooden elephant sculpture with detailed traditional motifs",
    "Ceramic pottery with blue and white traditional designs",
    "Silver jewelry with traditional Indian gemstone settings",
    "Embroidered textile with colorful floral patterns",
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5" />
            AI Product Image Generator
          </CardTitle>
          <CardDescription>Generate beautiful product images using AI based on your description</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Prompt Input */}
          <div className="space-y-2">
            <Label htmlFor="prompt">Describe your product</Label>
            <Textarea
              id="prompt"
              placeholder="e.g., Traditional handwoven silk saree with golden border and intricate paisley patterns"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Suggested Prompts */}
          <div className="space-y-2">
            <Label>Quick suggestions:</Label>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((suggestion, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => setPrompt(suggestion)}
                >
                  {suggestion}
                </Badge>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <Button onClick={handleGenerate} disabled={!prompt.trim() || isGenerating} className="w-full">
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating Image...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4 mr-2" />
                Generate Image
              </>
            )}
          </Button>

          {/* Generated Image */}
          {(generatedImage || isGenerating) && (
            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-muted/50">
                {isGenerating ? (
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Creating your image...</p>
                    </div>
                  </div>
                ) : generatedImage ? (
                  <div className="space-y-4">
                    <img
                      src={generatedImage || "/placeholder.svg"}
                      alt={generatedPrompt}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleRegenerate} variant="outline" className="flex-1 bg-transparent">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Regenerate
                      </Button>
                      <Button onClick={handleUseImage} className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Use This Image
                      </Button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Tips for better results:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Be specific about materials (silk, brass, wood, ceramic)</li>
              <li>• Mention traditional patterns or motifs</li>
              <li>• Include colors and decorative elements</li>
              <li>• Specify the style (traditional, contemporary, vintage)</li>
            </ul>
          </div>
        </CardContent>

        <div className="p-6 pt-0">
          <Button variant="outline" onClick={onClose} className="w-full bg-transparent">
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  )
}
