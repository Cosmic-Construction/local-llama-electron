import * as React from "react";
import { useState } from "react";

import { Persona } from "src/types";
import { PREDEFINED_PERSONAS } from "src/personas";

interface PersonaSelectorProps {
  selectedPersona: Persona;
  onPersonaChange: (persona: Persona) => void;
}

/**
 * A dropdown selector for choosing different chat personas
 */
const PersonaSelector = ({ selectedPersona, onPersonaChange }: PersonaSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePersonaSelect = (persona: Persona) => {
    onPersonaChange(persona);
    setIsOpen(false);
  };

  return (
    <div className="dropdown dropdown-bottom mb-4">
      <div 
        tabIndex={0} 
        role="button" 
        className="btn btn-outline btn-sm w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex-1 text-left">
          <strong>{selectedPersona.name}</strong>
          <div className="text-xs opacity-70">{selectedPersona.description}</div>
        </span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      {isOpen && (
        <ul 
          tabIndex={0} 
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full max-h-60 overflow-y-auto"
        >
          {PREDEFINED_PERSONAS.map((persona) => (
            <li key={persona.id}>
              <button
                className={`w-full text-left ${selectedPersona.id === persona.id ? 'active' : ''}`}
                onClick={() => handlePersonaSelect(persona)}
              >
                <div>
                  <div className="font-semibold">{persona.name}</div>
                  <div className="text-xs opacity-70">{persona.description}</div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PersonaSelector;