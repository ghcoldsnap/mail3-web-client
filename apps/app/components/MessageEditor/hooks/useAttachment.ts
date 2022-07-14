import { atomWithReset, useResetAtom } from 'jotai/utils'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { SubmitMessage } from 'models/src/submitMessage'
import { useAttachment as useGenericAttachment } from '../../../hooks/useAttachment'

export interface AttachmentExtraInfo {
  downloadProgress?: number
}

const attachmentsAtom = atomWithReset<SubmitMessage.Attachment[]>([])
const attachmentExtraInfoAtom = atomWithReset<{
  [key: string]: AttachmentExtraInfo
}>({})

export function useAttachment() {
  const {
    attachments: genericAttachments,
    loadAttachments,
    isLoadingAttachments,
  } = useGenericAttachment()

  const [attachments, setAttachments] = useAtom(attachmentsAtom)
  const [attachmentExtraInfo, setAttachmentExtraInfo] = useAtom(
    attachmentExtraInfoAtom
  )
  const onResetAttachments = useResetAtom(attachmentsAtom)

  useEffect(() => {
    setAttachments(genericAttachments)
  }, [genericAttachments])

  return {
    attachments,
    setAttachments,
    attachmentExtraInfo,
    setAttachmentExtraInfo,
    onResetAttachments,
    isLoadingAttachments,
    loadAttachments,
  }
}
