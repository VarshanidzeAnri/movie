import { useEffect, useState } from 'react';

function RadioButton({ onChangeType, initialValue = 0 }) {
    const [selectedType, setSelectedType] = useState(initialValue);

    useEffect(() => {
        setSelectedType(initialValue);
    }, [initialValue]);

    const handleChange = (value) => {
        onChangeType(value);
        setSelectedType(value);
    };

    return (
        <div className="relative flex w-full max-w-md bg-gray-800/50 backdrop-blur-sm rounded-xl p-1 shadow-xl">
            {/* Background highlight for selected option */}
            <div 
                className={`absolute h-full top-0 w-1/2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 ease-in-out shadow-lg ${
                    selectedType === 1 ? 'translate-x-full' : 'translate-x-0'
                }`}
                style={{ transform: selectedType === 1 ? 'translateX(100%)' : 'translateX(0)' }}
            />
            
            {/* Movie Option */}
            <div className="w-1/2 relative z-10">
                <input
                    type="radio"
                    id="movie-option"
                    name="content-type"
                    className="hidden"
                    checked={selectedType === 0}
                    onChange={() => handleChange(0)}
                />
                <label 
                    htmlFor="movie-option" 
                    className={`block w-full text-center py-3 px-4 cursor-pointer rounded-lg font-medium text-base transition-all duration-300 ${
                        selectedType === 0 
                            ? 'text-white' 
                            : 'text-gray-400 hover:text-white'
                    }`}
                >
                    ფილმი
                </label>
            </div>
            
            {/* TV Series Option */}
            <div className="w-1/2 relative z-10">
                <input
                    type="radio"
                    id="series-option"
                    name="content-type"
                    className="hidden"
                    checked={selectedType === 1}
                    onChange={() => handleChange(1)}
                />
                <label 
                    htmlFor="series-option" 
                    className={`block w-full text-center py-3 px-4 cursor-pointer rounded-lg font-medium text-base transition-all duration-300 ${
                        selectedType === 1 
                            ? 'text-white' 
                            : 'text-gray-400 hover:text-white'
                    }`}
                >
                    სერიალი
                </label>
            </div>
        </div>
    );
}

export default RadioButton;
