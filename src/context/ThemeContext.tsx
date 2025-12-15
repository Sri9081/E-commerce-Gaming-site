import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type ThemeMode = 'default' | 'hardware' | 'game' | 'deals';

interface ThemeContextType {
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<ThemeMode>('default');

    useEffect(() => {
        const root = document.documentElement;

        // Reset to defaults first
        if (theme === 'default') {
            root.style.setProperty('--color-primary', '139 92 246'); // Violet (Game/General)
            root.style.setProperty('--color-secondary', '6 182 212'); // Cyan (Hardware)
        } else if (theme === 'hardware') {
            // Hardware Theme: Dominant Cyan
            root.style.setProperty('--color-primary', '6 182 212'); // Cyan 500
            root.style.setProperty('--color-secondary', '14 165 233'); // Sky 500
        } else if (theme === 'game') {
            // Game Theme: Dominant Purple/Pink
            root.style.setProperty('--color-primary', '168 85 247'); // Purple 500
            root.style.setProperty('--color-secondary', '236 72 153'); // Pink 500
        } else if (theme === 'deals') {
            // Hot Deals Theme: Orange/Red
            root.style.setProperty('--color-primary', '249 115 22'); // Orange 500
            root.style.setProperty('--color-secondary', '220 38 38'); // Red 600
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
