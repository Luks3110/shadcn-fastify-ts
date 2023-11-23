'use client';
import { getMostCommonCep } from '@/services/employee/getMostCommonCep';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';

export function MostCommonCep() {
  const [commonCep, setCommonCep] = useState<string | null>(null);
  const handleClick = async () => {
    const { cep } = await getMostCommonCep();
    setCommonCep(cep);
  };
  return (
    <div className="flex flex-col items-center">
      <div className="p-5 h-12 mb-12 text-center">
        {commonCep ? (
          <Badge className="w-[15rem] flex justify-center">{commonCep}</Badge>
        ) : null}
      </div>
      <Button onClick={handleClick} className="w-[15rem]" type="submit">
        Descobrir
      </Button>
    </div>
  );
}
