// import { useMutation, useQuery } from '@tanstack/react-query'

// import { createDocument, fetchDocument, getDocumentsToApprove, changeDocumentStatus } from '../api/documentApi'


// export const useCreateDocumentMutation = () => {
//     return useMutation({
//         // todo: this might cause a problem later on if we have multiple create document mutations
//         // we should probably use a unique key for each mutation to avoid conflicts
//         mutationKey: ['create-document'],
//         mutationFn: createDocument,
//     });
// };


// export const useGetDocumentQuery = (userId: string) => {
//     return useQuery({
//         queryKey: ['document', userId],
//         queryFn: () => fetchDocument(userId),
//     });
// };

// // get documents based on the user role
// export const useGetDocumentsByRoleQuery = (role: string) => {
//     return useQuery({
//         queryKey: ['documents', role],
//         queryFn: () => fetchDocument(role),
//     });
// };

// export const useGetDocumentsToApprove = () => {
//     return useQuery({
//         queryKey: ['check-documents'],
//         queryFn: getDocumentsToApprove,
//     });
// }

// export const useUpdateDocumentStatus = () => {
//     return useMutation({
//         mutationKey: ['update-document-status'],
//         mutationFn: ({ documentId, status }: { documentId: string, status: "Approved" | "Declined" }) => changeDocumentStatus({ documentId, status })
//     })
// }

