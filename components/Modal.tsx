'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { FaTimes } from 'react-icons/fa'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  titleId?: string
  className?: string
  bodyClassName?: string
  hideHeader?: boolean
  closeButtonClassName?: string
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  titleId,
  className = '',
  bodyClassName = '',
  hideHeader = false,
  closeButtonClassName = '',
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [isOpen])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const onNativeClose = () => onClose()
    dialog.addEventListener('close', onNativeClose)
    return () => dialog.removeEventListener('close', onNativeClose)
  }, [onClose])

  const requestClose = () => {
    dialogRef.current?.close()
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) {
      requestClose()
    }
  }

  const closeButton = (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        requestClose()
      }}
      className={`cursor-pointer ${
        closeButtonClassName ||
        'relative z-10 rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-primary'
      }`}
      aria-label="Fermer"
    >
      <FaTimes className="text-xl" />
    </button>
  )

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className={`z-50 m-auto w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-xl border-0 bg-white p-0 text-foreground shadow-2xl backdrop:bg-black/50 [&[open]]:flex [&[open]]:flex-col ${className}`}
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div
        className={`flex min-h-0 flex-1 flex-col overflow-hidden ${hideHeader ? 'relative' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {hideHeader ? (
          <>
            <div className="absolute right-3 top-3 z-20">{closeButton}</div>
            <div className={bodyClassName}>{children}</div>
          </>
        ) : (
          <>
            <div className="relative z-10 flex shrink-0 items-center justify-between border-b border-gray-200 p-6">
              {title ? (
                <h2 id={titleId} className="font-display text-xl font-bold">
                  {title}
                </h2>
              ) : (
                <span />
              )}
              {closeButton}
            </div>
            <div className={`min-h-0 flex-1 overflow-y-auto overscroll-contain ${bodyClassName}`}>
              {children}
            </div>
          </>
        )}
      </div>
    </dialog>
  )
}
