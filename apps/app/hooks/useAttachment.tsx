import { useCallback, useState } from 'react'
import { GetMessage } from 'models/src/getMessage'
import { SubmitMessage } from 'models/src/submitMessage'
import { get, set } from 'idb-keyval'
import { convertBlobToBase64 } from '../utils/file'
import { useAPI } from './useAPI'

export interface AttachmentExtraInfo {
  downloadProgress?: number
}

const generateAttachmentIndexedDBKey = (id: string) => `attachment:${id}`

export function useAttachment() {
  const api = useAPI()
  const [attachments, setAttachments] = useState<SubmitMessage.Attachment[]>([])
  const [isLoadingAttachments, setIsLoadingAttachments] = useState(false)
  const [attachmentExtraInfo, setAttachmentExtraInfo] = useState<{
    [key: string]: AttachmentExtraInfo
  }>({})

  const loadAttachments = useCallback(
    async (id: string, shouldLoadAttachments: GetMessage.Attachment[]) => {
      setIsLoadingAttachments(true)
      setAttachments(
        shouldLoadAttachments.map((a) => ({
          filename: a.filename,
          contentType: a.contentType,
          cid: a.contentId,
          content: '',
          contentDisposition: a.inline ? 'inline' : 'attachment',
        }))
      )
      setAttachmentExtraInfo(
        shouldLoadAttachments.reduce<{
          [key: string]: AttachmentExtraInfo
        }>(
          (acc, cur) => ({
            ...acc,
            [cur.contentId]: { downloadProgress: 0 },
          }),
          {}
        )
      )
      await Promise.all(
        shouldLoadAttachments.map(async (a, i) => {
          const key = generateAttachmentIndexedDBKey(a.id)
          return (
            get(key)
              // 1. Find from `IndexedDb`, if not, get from `Api`
              .then(
                async (
                  readAttachmentFromIndexedDb: SubmitMessage.Attachment
                ) => {
                  if (!readAttachmentFromIndexedDb) {
                    const apiBase64 = await api
                      .downloadAttachment(id, a.id)
                      .then((res) =>
                        convertBlobToBase64(res.data).then(
                          (b) => b.split(',')[1]
                        )
                      )
                    return {
                      base64: apiBase64,
                      from: 'api',
                    }
                  }
                  return {
                    base64: readAttachmentFromIndexedDb.content,
                    from: 'indexeddb',
                  }
                }
              )
              // 2. Set local variables
              .then(({ base64, from }) => {
                setAttachmentExtraInfo((o) => ({
                  ...o,
                  [a.contentId]: { downloadProgress: 1 },
                }))
                setAttachments((oldStateAttachments) => {
                  // eslint-disable-next-line no-param-reassign,prefer-destructuring
                  oldStateAttachments[i].content = base64
                  if (from === 'api') {
                    set(key, oldStateAttachments[i])
                  }
                  return oldStateAttachments.concat([])
                })
              })
              .catch(() => {})
          )
        })
      )
      setIsLoadingAttachments(false)
    },
    [setAttachments]
  )

  return {
    attachments,
    setAttachments,
    attachmentExtraInfo,
    setAttachmentExtraInfo,
    isLoadingAttachments,
    loadAttachments,
  }
}
