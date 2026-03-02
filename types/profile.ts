export type ProfileFormState = {
    success: boolean
    errors?: {
        name?: string
        whatsAppNumber?: string
    }
    message?: string
}
