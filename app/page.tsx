'use client';

import { useState } from 'react';
import Image from "next/image";

export default function Home() {
  const [tareas, setTareas] = useState<any[]>([]);
  const [textoInput, setTextoInput] = useState('');
  const [idEditando, setIdEditando] = useState<any>(null);
  const [textoEditado, setTextoEditado] = useState('');

  const agregarTarea = (e: any) => {
    if (e.key === 'Enter' && textoInput.trim() !== '') {
      const nuevaTarea = {
        id: Date.now(),
        texto: textoInput.trim(),
        completada: false,
      };
      setTareas([...tareas, nuevaTarea]);
      setTextoInput('');
    }
  };

  const cambiarEstado = (id: any) => {
    const nuevasTareas = tareas.map((t) => {
      if (t.id === id) {
        return { ...t, completada: !t.completada };
      }
      return t;
    });
    setTareas(nuevasTareas);
  };

  const iniciarEdicion = (tarea: any) => {
    setIdEditando(tarea.id);
    setTextoEditado(tarea.texto);
  };

  const guardarEdicion = (id: any) => {
    const nuevasTareas = tareas.map((t) => {
      if (t.id === id) {
        return { ...t, texto: textoEditado.trim() };
      }
      return t;
    });
    setTareas(nuevasTareas);
    setIdEditando(null);
  };

  const eliminarTarea = (id: any) => {
    const tareasFiltradas = tareas.filter((t) => t.id !== id);
    setTareas(tareasFiltradas);
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-xl flex-col items-center justify-start py-16 px-8 bg-white dark:bg-black sm:items-start gap-8">
        
        <div className="w-full flex flex-col gap-4 text-left">
          <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Mi Lista de Tareas
          </h1>

          <input
            type="text"
            placeholder="Escribe una tarea y presiona Enter..."
            value={textoInput}
            onChange={(e) => setTextoInput(e.target.value)}
            onKeyDown={agregarTarea}
            className="w-full p-3 rounded-lg border border-black/[.08] dark:border-white/[.145] bg-transparent text-black dark:text-white focus:outline-none placeholder-zinc-500"
          />

          <ul className="w-full flex flex-col gap-2 mt-2">
            {tareas.map((tarea) => (
              <li
                key={tarea.id}
                className="flex items-center justify-between p-3 rounded-lg border border-black/[.08] dark:border-white/[.145]"
              >
                <div className="flex items-center gap-3 flex-1 mr-2">
                  <input
                    type="checkbox"
                    checked={tarea.completada}
                    onChange={() => cambiarEstado(tarea.id)}
                    className="w-4 h-4 cursor-pointer"
                  />

                  {idEditando === tarea.id ? (
                    <input
                      type="text"
                      value={textoEditado}
                      onChange={(e) => setTextoEditado(e.target.value)}
                      onBlur={() => guardarEdicion(tarea.id)}
                      onKeyDown={(e) => e.key === 'Enter' && guardarEdicion(tarea.id)}
                      autoFocus
                      className="px-2 py-1 rounded border border-zinc-400 bg-transparent text-black dark:text-white focus:outline-none"
                    />
                  ) : (
                    <span
                      onClick={() => iniciarEdicion(tarea)}
                      className={`cursor-pointer flex-1 ${
                        tarea.completada
                          ? 'line-through text-zinc-400 dark:text-zinc-500'
                          : 'text-black dark:text-zinc-50'
                      }`}
                    >
                      {tarea.texto}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => eliminarTarea(tarea.id)}
                  className="px-3 py-1 text-sm rounded-full bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  Borrar
                </button>
              </li>
            ))}
          </ul>

        </div>

      </main>
    </div>
  );
}