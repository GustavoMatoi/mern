import React, { useEffect, useState } from 'react';

type RadioGroupProps = {
  onSelectionChange : (value: string) => void,
  selecionado?: string
}

const RadioGroup = ({onSelectionChange, selecionado } : RadioGroupProps) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (onSelectionChange) {
      onSelectionChange(value); 
    }
  };
    useEffect(() => {
      if (selecionado) {
        setSelectedValue(selecionado); 
      }
    }, [selecionado]);

  return (
    <div className='flex flex-col'>
      <h3 className="font-bold">Escolha uma categoria:</h3>

      <label className='mt-1'>
        <input
          type="radio"
          name="categoria"
          value="ciência"
          checked={selectedValue === 'ciência'}
          onChange={handleRadioChange}

        />
        Ciência
      </label>

      <label className='mt-1'>
        <input
          type="radio"
          name="categoria"
          value="arte"
          checked={selectedValue === 'arte'}
          onChange={handleRadioChange}
        />
        Arte
      </label>

      <label className='mt-1'>
        <input
          type="radio"
          name="categoria"
          value="tecnologia"
          checked={selectedValue === 'tecnologia'}
          onChange={handleRadioChange}
        />
        Tecnologia
      </label>

      <label className='mt-1'>
        <input
          type="radio"
          name="categoria"
          value="gastronomia"
          checked={selectedValue === 'gastronomia'}
          onChange={handleRadioChange}
        />
        Gastronomia
      </label>

      <label className='mt-1'>
        <input
          type="radio"
          name="categoria"
          value="geek"
          checked={selectedValue === 'geek'}
          onChange={handleRadioChange}
        />
        Geek
      </label>

      <label className='mt-1'>
        <input
          type="radio"
          name="categoria"
          value="fitness"
          checked={selectedValue === 'fitness'}
          onChange={handleRadioChange}
        />
        Fitness
      </label>


    </div>
  );
};

export default RadioGroup;
