// utils/copyToClipboard.ts
export async function copyToClipboard(
  text: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Modern browsers
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return { success: true }
    }

    // Fallback (older browsers)
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.left = '-9999px'

    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()

    const successful = document.execCommand('copy')
    document.body.removeChild(textarea)

    return successful
      ? { success: true }
      : { success: false, error: 'Copy command failed' }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    }
  }
}
