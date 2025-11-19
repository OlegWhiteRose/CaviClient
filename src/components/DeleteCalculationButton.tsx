import { Button } from 'react-bootstrap';

interface DeleteCalculationButtonProps {
  onDelete: () => void;
  isDeleting: boolean;
}

export const DeleteCalculationButton = ({ onDelete, isDeleting }: DeleteCalculationButtonProps) => (
  <div className="delete-calculation-section">
    <Button
      variant="danger"
      onClick={onDelete}
      disabled={isDeleting}
    >
      {isDeleting ? 'Удаление...' : 'Удалить заявку'}
    </Button>
  </div>
);
