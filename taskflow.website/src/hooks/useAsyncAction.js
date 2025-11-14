import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

export const useAsyncAction = () => {
    const [isLoading, setIsLoading] = useState(false);

    const execute = useCallback(async (action, options = {}) => {
        const {
            successMessage = null,
            errorMessage = null,
            showLoading = true,
            onSuccess = null,
            onError = null
        } = options;

        if (showLoading) {
            setIsLoading(true);
        }

        try {
            const result = await action();

            if (successMessage) {
                toast.success(successMessage);
            }

            if (onSuccess) {
                onSuccess(result);
            }

            return { success: true, data: result };
        } catch (error) {
            if (errorMessage) {
                toast.error(errorMessage);
            }

            if (onError) {
                onError(error);
            }

            console.error('Async action failed:', error);
            return { success: false, error };

        } finally {
            if (showLoading) {
                setIsLoading(false);
            }
        }
    }, []);

    return { execute, isLoading };
};
