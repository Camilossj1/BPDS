'use client';

import { useState } from 'react';
import { Tarea } from '@/types/todo';
import { PapeleraMenu } from './papeleramenu';

interface PapeleraProps {
  tareasEliminadas: Tarea[];
  onRestaurar: (id: number) => void;
  onEliminarDefinitivo: (id: number) => void;
}

export default function Papelera({
  tareasEliminadas,
  onRestaurar,
  onEliminarDefinitivo,
}: PapeleraProps) {
  const [abierto, setAbierto] = useState(false);

  return (
    <PapeleraMenu
      abierto={abierto}
      setAbierto={setAbierto}
      tareasEliminadas={tareasEliminadas}
      onRestaurar={onRestaurar}
      onEliminarDefinitivo={onEliminarDefinitivo}
    />
  );
}