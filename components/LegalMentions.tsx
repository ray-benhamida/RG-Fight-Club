'use client'

import LegalMentionsBody from '@/components/LegalMentionsBody'
import Modal from '@/components/Modal'

interface LegalMentionsProps {
  isOpen: boolean
  onClose: () => void
}

export default function LegalMentions({ isOpen, onClose }: LegalMentionsProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Mentions légales"
      titleId="legal-mentions-title"
      className="h-[85vh] max-h-[90vh] max-w-2xl"
      bodyClassName="p-6 font-sans text-sm leading-relaxed"
    >
      <LegalMentionsBody />
    </Modal>
  )
}
