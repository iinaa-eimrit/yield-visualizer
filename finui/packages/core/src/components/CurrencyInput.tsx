import React from 'react'
import { NumericFormat } from 'react-number-format'

export interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type' | 'defaultValue'> {
  value: number | null;
  onChange: (value: number | null) => void;
  currency?: string;
  locale?: string;
  error?: string;
  type?: 'text' | 'tel' | 'password';
  defaultValue?: number | string | null;
}

export const CurrencyInput = ({ value, onChange, currency = 'USD', error, className, ...props }: CurrencyInputProps) => {
  return (
    <div className="flex flex-col gap-1 w-full font-sans">
      <NumericFormat
        value={value ?? ''}
        onValueChange={(values) => onChange(values.floatValue ?? null)}
        thousandSeparator
        prefix={currency === 'USD' ? '$' : ''}
        decimalScale={2}
        fixedDecimalScale
        className={`w-full border px-3 py-2 rounded font-mono text-sm focus:outline-none focus:ring-2 focus:ring-fin-blue-500 transition-shadow ${error ? 'border-fin-red-500 focus:ring-fin-red-500/50' : 'border-gray-300'} ${className || ''}`}
        {...props}
      />
      {error && <span className="text-xs text-fin-red-600 font-medium">{error}</span>}
    </div>
  )
}
