import toast from 'react-hot-toast';
import Flex from '@common/layout/Flex';
import Button from '@common/buttons/Button';

const ConfirmDialog = ({
    title = 'Confirm action?',
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'danger',
    onConfirm,
    onCancel,
    toastId
}) => {
    const handleConfirm = () => {
        toast.dismiss(toastId);
        onConfirm?.();
    };

    const handleCancel = () => {
        toast.dismiss(toastId);
        onCancel?.();
    };

    return (
        <Flex direction="column" gap="4" className="w-full">
            <Flex direction="column" gap="2">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                    {title}
                </h3>
                {message && (
                    <p className="text-sm text-[var(--color-text-muted)]">
                        {message}
                    </p>
                )}
            </Flex>

            <Flex gap="3" justify="end">
                <Button
                    variant="secondary"
                    onClick={handleCancel}
                >
                    {cancelText}
                </Button>
                <Button
                    variant={variant}
                    onClick={handleConfirm}
                >
                    {confirmText}
                </Button>
            </Flex>
        </Flex>
    );
};

export const showConfirmDialog = ({
    title,
    message,
    confirmText,
    cancelText,
    variant = 'danger',
    position = 'top-center',
}) => {
    return new Promise((resolve) => {
        toast(
            (t) => (
                <ConfirmDialog
                    title={title}
                    message={message}
                    confirmText={confirmText}
                    cancelText={cancelText}
                    variant={variant}
                    toastId={t.id}
                    onConfirm={() => resolve(true)}
                    onCancel={() => resolve(false)}
                />
            ),
            {
                duration: Infinity,
                position,
                style: {
                    background: 'var(--color-surface-hover)',
                    border: '1px solid var(--color-border-light)',
                    padding: '1.25rem',
                    borderRadius: '0.75rem',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
                    minWidth: '360px',
                    maxWidth: '500px',
                },
            }
        );
    });
};

export default ConfirmDialog;
