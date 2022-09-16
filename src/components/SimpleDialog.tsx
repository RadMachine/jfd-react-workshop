import { LoadingButton } from '@mui/lab'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

interface ISimpleDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: () => void | Promise<void>
  loading?: boolean
  title: string
  content?: string
}

function SimpleDialog({ open, onClose, onSubmit, loading, title, content }: ISimpleDialogProps) {
  const submitAndClose = async () => {
    await onSubmit()
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      {content && (
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <LoadingButton loading={loading} onClick={submitAndClose} type="submit">
          Подтвердить
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default SimpleDialog
