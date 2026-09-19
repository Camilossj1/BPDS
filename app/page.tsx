'use client';

import { useState } from 'react';
import { Tarea } from '@/types/todo';
import Papelera from '@/components/papelera';

export default function Home() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [papelera, setPapelera] = useState<Tarea[]>([]);
  const [textoInput, setTextoInput] = useState('');
  const [idEditando, setIdEditando] = useState<number | null>(null);
  const [textoEditado, setTextoEditado] = useState('');

  const agregarTarea = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && textoInput.trim() !== '') {
      const nuevaTarea: Tarea = {
        id: Date.now(),
        texto: textoInput.trim(),
        completada: false,
      };
      setTareas([...tareas, nuevaTarea]);
      setTextoInput('');
    }
  };

  const cambiarEstado = (id: number) => {
    setTareas(
      tareas.map((t) => (t.id === id ? { ...t, completada: !t.completada } : t))
    );
  };

  const iniciarEdicion = (tarea: Tarea) => {
    setIdEditando(tarea.id);
    setTextoEditado(tarea.texto);
  };

  const guardarEdicion = (id: number) => {
    setTareas(
      tareas.map((t) => (t.id === id ? { ...t, texto: textoEditado.trim() } : t))
    );
    setIdEditando(null);
  };

  const enviarAPapelera = (id: number) => {
    const tareaAEliminar = tareas.find((t) => t.id === id);
    if (tareaAEliminar) {
      setPapelera([...papelera, tareaAEliminar]);
      setTareas(tareas.filter((t) => t.id !== id));
    }
  };

  const restaurarTarea = (id: number) => {
    const tareaARestaurar = papelera.find((t) => t.id === id);
    if (tareaARestaurar) {
      setTareas([...tareas, tareaARestaurar]);
      setPapelera(papelera.filter((t) => t.id !== id));
    }
  };

  const eliminarDefinitivo = (id: number) => {
    setPapelera(papelera.filter((t) => t.id !== id));
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-zinc-50 font-sans dark:bg-black relative">
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
                      onKeyDown={(e) =>
                        e.key === 'Enter' && guardarEdicion(tarea.id)
                      }
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
                  onClick={() => enviarAPapelera(tarea.id)}
                  className="px-3 py-1 text-sm rounded-full bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  Borrar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <Papelera
        tareasEliminadas={papelera}
        onRestaurar={restaurarTarea}
        onEliminarDefinitivo={eliminarDefinitivo}
      />
    </div>
  );
}