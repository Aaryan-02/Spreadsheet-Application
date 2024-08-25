import { create } from 'zustand';

export const useSpreadsheetStore = create((set) => ({
    data: {},
    searchResults: [],
    theme: 'light',
    undoStack: [],
    redoStack: [],
    cellFormatting: {},
    selectedCellId: null,
    currentPage: 1,
    cellsPerPage: 100,
    numericOnly: false,

    updateCellData: (cellId, value) => set((state) => {
        const newUndoStack = [...state.undoStack, { ...state.data }];

        return {
            data: { ...state.data, [cellId]: value },
            undoStack: newUndoStack,
            redoStack: []
        };
    }),

    updateCellFormatting: (cellId, formatting) => set((state) => {
        const currentFormatting = state.cellFormatting[cellId] || {};
        return {
            cellFormatting: {
                ...state.cellFormatting,
                [cellId]: { ...currentFormatting, ...formatting },
            },
        };
    }),

    setNumericOnly: (value) => set(() => ({
        numericOnly: value
    })),

    setSelectedCellId: (cellId) => set(() => ({
        selectedCellId: cellId
    })),

    undo: () => set((state) => {
        if (state.undoStack.length > 0) {
            const previousState = state.undoStack[state.undoStack.length - 1];
            const newUndoStack = state.undoStack.slice(0, -1);

            const newRedoStack = [...state.redoStack, state.data];

            return {
                data: previousState,
                undoStack: newUndoStack,
                redoStack: newRedoStack
            };
        } else {
            console.warn("No actions to undo");
            return state;
        }
    }),

    redo: () => set((state) => {
        if (state.redoStack.length > 0) {
            const nextState = state.redoStack[state.redoStack.length - 1];
            const newRedoStack = state.redoStack.slice(0, -1);

            const newUndoStack = [...state.undoStack, state.data];

            return {
                data: nextState,
                undoStack: newUndoStack,
                redoStack: newRedoStack
            };
        } else {
            console.warn("No actions to redo");
            return state;
        }
    }),

    search: (query) => set((state) => {
        const { cellsPerPage } = state;
        const filtered = Object.entries(state.data).filter(([cellId, value]) =>
            value.toLowerCase().includes(query.toLowerCase())
        );

        if (filtered.length > 0) {
            const firstCellId = parseInt(filtered[0][0], 10);
            const firstResultPage = Math.floor(firstCellId / cellsPerPage) + 1;

            return {
                searchResults: filtered,
                currentPage: firstResultPage,
            };
        }

        return { searchResults: filtered };
    }),

    clearSearch: () => set(() => ({
        searchResults: [],
        currentPage: 1,
    })),

    toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light',
    })),

    setPage: (page) => set(() => ({
        currentPage: page
    })),
}));
