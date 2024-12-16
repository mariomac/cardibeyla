'use client'

import { Factor, FactorsMap } from '@/types/attribute';
import React, { useState } from 'react';

interface SelectorProps {
    factors: FactorsMap;
    // onSelect: (selectedFactor: Factor|BoundedFactor) => void;
}

const FactorSelector: React.FC<SelectorProps> = ({ factors }) => {
    const [selectedFactor, setSelectedFactor] = useState<Factor | null>(null);

    const handleSelect = (factor: Factor) => {
        // setSelectedFactor(factor);
        // onSelect(factor);
    };

    return (
        <div>
            {Object.entries(factors).map(([groupName, factor]) => (
                <div key={groupName}>
                    <h2 >{groupName} </h2>
                    {factor.names.map((fname) => (
                        <div key={fname} onClick={() => handleSelect(factor)}>
                            <input type="checkbox" id={fname} />{fname}
                            {factor.values?.map((value) => (
                                <div className="metricVal" key={value}>
                                <input type="checkbox" id={value} />{value}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default FactorSelector;