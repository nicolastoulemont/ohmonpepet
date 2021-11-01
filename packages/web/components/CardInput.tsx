import React from 'react'
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/react'
import { CardElement } from '@stripe/react-stripe-js'
import { useI18n } from 'utils/hooks/useI18n'
import cardInputJSON from 'statics/components/cardInput.json'
const CARD_ELEMENT_OPTIONS = {
	style: {
		base: {
			color: '#32325d',
			fontFamily:
				'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
			fontSmoothing: 'antialiased',
			fontSize: '16px',

			'::placeholder': {
				color: '#aab7c4'
			},
			':-webkit-autofill': {
				color: '#32325d'
			}
		},
		invalid: {
			color: '#fa755a',
			iconColor: '#fa755a',
			':-webkit-autofill': {
				color: '#fa755a'
			}
		}
	}
}

interface CardInputProps {
	label?: string
	error?: string
	handleChange?: any
}

export function CardInput({ label, error, handleChange }: CardInputProps) {
	const { t } = useI18n(cardInputJSON)
	return (
		<FormControl>
			<FormLabel mb={3}>{label ? label : t('label')}</FormLabel>
			<CardElement id='card-element' options={CARD_ELEMENT_OPTIONS} onChange={handleChange} />
			{error && <FormHelperText color='red.500'>{error}</FormHelperText>}

			<style>{`
            
                #card-element {
                    border:1px solid #E2E8F0;
                    border-radius: 0.375rem;
                    padding: 0.75rem;
                }

                #card-element fieldset { 
                    margin: 0 15px 20px;
                    padding: 0;
                    border-style: none;
                    background-color: #7795f8;
                    box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08),
                      inset 0 1px 0 #829fff;
                    border-radius: 4px;
                  }
                  
                  #card-element .row {
                    display: -ms-flexbox;
                    display: flex;
                    -ms-flex-align: center;
                    align-items: center;
                    margin-left: 15px;
                  }
                  
                  #card-element .row + .row {
                    border-top: 1px solid #819efc;
                  }
                  
              
                  
                  #card-element input {
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                    outline: none;
                    border-style: none
                  }
                  
                  #card-element input:-webkit-autofill {
                    -webkit-text-fill-color: #fce883;
                    transition: background-color 100000000s;
                    -webkit-animation: 1ms void-animation-out;
                  }
                  
                  #card-element .StripeElement--webkit-autofill {
                    background: transparent !important;
                  }
                  
                  #card-element .StripeElement {
                    width: 100%;
                    padding: 11px 15px 11px 0;
                  }
                  
                  #card-element input {
                    width: 100%;
                    padding: 11px 15px 11px 0;
                    color: #fff;
                    background-color: transparent;
                    -webkit-animation: 1ms void-animation-out;
                  }
                  
                  #card-element input::-webkit-input-placeholder {
                    color: #87bbfd;
                  }
                  
                  #card-element input::-moz-placeholder {
                    color: #87bbfd;
                  }
                  
                  #card-element input:-ms-input-placeholder {
                    color: #87bbfd;
                  }
                  
          
                  #card-element .error svg .base {
                    fill: #fff;
                  }
                  
                  #card-element .error svg .glyph {
                    fill: #6772e5;
                  }
                  
                  #card-element .error .message {
                    color: #fff;
                  }
                  
                  #card-element .success .icon .border {
                    stroke: #87bbfd;
                  }
                  
                  #card-element .success .icon .checkmark {
                    stroke: #fff;
                  }
                  
                  #card-element .success .title {
                    color: #fff;
                  }
                  
                  #card-element .success .message {
                    color: #9cdbff;
                  }
                  
                  #card-element .success .reset path {
                    fill: #fff;
                  }

                `}</style>
		</FormControl>
	)
}
