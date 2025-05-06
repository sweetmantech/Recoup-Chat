import { useState } from "react";
import { Attachment } from '@ai-sdk/ui-utils';

/**
 * Hook for managing file attachments in chat
 * Handles file attachments state and pending uploads
 */
const useAttachments = () => {
    const [attachments, setAttachmentsState] = useState<Attachment[]>([]);
    
    // Custom setter that handles both direct array updates and functional updates
    const setAttachments = (
        attachmentsOrFn: Attachment[] | ((prev: Attachment[]) => Attachment[])
    ) => {
        if (typeof attachmentsOrFn === 'function') {
            setAttachmentsState(prev => attachmentsOrFn(prev));
        } else {
            setAttachmentsState(attachmentsOrFn);
        }
    };
    
    // Track attachments that are currently being uploaded
    const pendingAttachments = attachments.filter(attachment => 
        // An attachment is pending if it has a temporary URL (blob:) or no URL
        attachment.url?.startsWith('blob:') || !attachment.url
    );
    
    // Get only the uploaded attachments (not pending)
    const uploadedAttachments = attachments.filter(attachment => 
        !pendingAttachments.includes(attachment)
    );
    
    // Remove an attachment by its index
    const removeAttachment = (indexToRemove: number) => {
        const attachmentToRemove = attachments[indexToRemove];
        
        // If the attachment has a blob URL, revoke it to prevent memory leaks
        if (attachmentToRemove?.url?.startsWith('blob:')) {
            URL.revokeObjectURL(attachmentToRemove.url);
        }
        
        setAttachmentsState(prev => prev.filter((_, index) => index !== indexToRemove));
    };
    
    // Clear all attachments
    const clearAttachments = () => {
        // Revoke any blob URLs to prevent memory leaks
        attachments.forEach(attachment => {
            if (attachment.url?.startsWith('blob:')) {
                URL.revokeObjectURL(attachment.url);
            }
        });
        
        setAttachmentsState([]);
    };

    // Check if there are any pending uploads
    const hasPendingUploads = pendingAttachments.length > 0;

    return { 
        attachments, 
        setAttachments, 
        pendingAttachments,
        uploadedAttachments,
        removeAttachment,
        clearAttachments,
        hasPendingUploads
    };
};

export default useAttachments;
