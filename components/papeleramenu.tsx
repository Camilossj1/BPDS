'use client';

import React from 'react';
import { Tarea } from '@/types/todo';

interface Props {
    abierto: boolean;
    setAbierto: (estado: boolean) => void;
    tareasEliminadas: Tarea[];
    onRestaurar: (id: number) => void;
    onEliminarDefinitivo: (id: number) => void;
}

export function PapeleraMenu({
    abierto,
    setAbierto,
    tareasEliminadas,
    onRestaurar,
    onEliminarDefinitivo,
}: Props) {
    return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end z-50">
        {abierto && (
        <div className="mb-2 w-80 max-h-80 overflow-y-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl p-4">
            <h3 className="font-semibold text-sm mb-3 text-black dark:text-white">
            Papelera de Reciclaje
            </h3>
            {tareasEliminadas.length === 0 ? (
            <p className="text-xs text-zinc-500">La papelera está vacía</p>
            ) : (
            <ul className="flex flex-col gap-2">
                {tareasEliminadas.map((tarea) => (
                <li
                    key={tarea.id}
                    className="flex items-center justify-between p-2 text-xs rounded bg-zinc-100 dark:bg-zinc-800"
                >
                    <span className="truncate mr-2 text-black dark:text-white">{tarea.texto}</span>
                    <div className="flex gap-1">
                    <button
                        onClick={() => onRestaurar(tarea.id)}
                        className="px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded hover:bg-green-500/20"
                    >
                        Restaurar
                    </button>
                    <button
                        onClick={() => onEliminarDefinitivo(tarea.id)}
                        className="px-2 py-1 bg-red-500/10 text-red-600 dark:text-red-400 rounded hover:bg-red-500/20"
                    >
                        Eliminar
                    </button>
                    </div>
                </li>
                ))}
            </ul>
            )}
        </div>
        )}

        <button
        onClick={() => setAbierto(!abierto)}
        className="flex items-center justify-center p-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors"
        >
        🗑️ ({tareasEliminadas.length})
        </button>
    </div>
    );
}