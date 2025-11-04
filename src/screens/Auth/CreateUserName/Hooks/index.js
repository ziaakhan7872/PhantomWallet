import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import database from '../../../../services/database';
import { routes } from '../../../../constants/routes';

const useCreateUserName = (props) => {
    const [userName, setUserName] = useState('');
    const [activeWallet, setActiveWallet] = useState(null);
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(null); // null = not checked, true = available, false = taken
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [walletError, setWalletError] = useState(null);
    const [validationError, setValidationError] = useState(null);

    // Get active wallet on mount
    useFocusEffect(
        useCallback(() => {
            const fetchActiveWallet = async () => {
                try {
                    setWalletError(null);
                    const wallet = await database.getActiveWallet();
                    if (wallet) {
                        setActiveWallet(wallet);
                        // Set initial username if wallet already has a name
                        if (wallet.name) {
                            setUserName(wallet.name);
                        }
                    } else {
                        setWalletError('No active wallet found. Please create a wallet first.');
                    }
                } catch (error) {
                    console.error('Error fetching active wallet:', error);
                    setWalletError('Failed to load wallet. Please try again.');
                }
            };

            fetchActiveWallet();
        }, [])
    );

    // Validate username uniqueness in real-time
    useEffect(() => {
        const validateUsername = async () => {
            if (!userName.trim()) {
                setIsUsernameAvailable(null);
                setValidationError(null);
                return;
            }

            if (userName.trim().length < 3) {
                setIsUsernameAvailable(false);
                setValidationError(null);
                return;
            }

            setIsCheckingUsername(true);
            setValidationError(null);
            try {
                const exists = await database.checkUsernameExists(
                    userName.trim(),
                    activeWallet?.id
                );
                setIsUsernameAvailable(!exists);
            } catch (error) {
                console.error('Error checking username:', error);
                setIsUsernameAvailable(null);
                setValidationError('Failed to check username availability. Please try again.');
            } finally {
                setIsCheckingUsername(false);
            }
        };

        // Debounce validation
        const timeoutId = setTimeout(() => {
            validateUsername();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [userName, activeWallet?.id]);

    const handleContinue = async () => {
        // Clear previous errors
        setError(null);

        if (!userName.trim()) {
            setError('Please enter a username');
            return;
        }

        if (userName.trim().length < 3) {
            setError('Username must be at least 3 characters long');
            return;
        }

        if (isUsernameAvailable === false) {
            setError('This username is already taken. Please choose another one.');
            return;
        }

        if (!activeWallet?.id) {
            setError('No active wallet found. Please create a wallet first.');
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            // Update wallet name
            await database.updateWalletName(activeWallet.id, userName.trim());

            setIsLoading(false);
            // Navigate to congratulation screen
            props?.navigation?.navigate(routes.congratulationScreen);
        } catch (error) {
            setIsLoading(false);
            console.error('Error updating wallet name:', error);
            setError('Failed to save username. Please try again.');
        }
    };

    // Clear error when userName changes (but not when error itself changes)
    useEffect(() => {
        setError(null);
    }, [userName]);

    return {
        userName,
        setUserName,
        activeWallet,
        isUsernameAvailable,
        isCheckingUsername,
        isLoading,
        error,
        walletError,
        validationError,
        handleContinue
    };
};

export default useCreateUserName;

