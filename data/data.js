
export const constructors = [
    {
        id: 'MER',
        name: 'Mercedes AMG',
        
    },
    {
        id: 'RBR',
        name: 'Red Bull Racing',
        
    },
    {
        id: 'MCL',
        name: 'McLaren Racing', 
        
    },
    {
        id: 'FER',
        name: 'Ferrari', 
        
    },
    {
        id: 'AMC',
        name: 'Aston Martin Cognizant', 
        
    },
    {
        id: 'ALP',
        name: 'Alpine F1', 
        
    },
    {
        id: 'HAS',
        name: 'Haas F1 Racing', 
        
    },
    {
        id: 'TAU',
        name: 'Alpha Tauri', 
        
    },
    {
        id: 'ALF',
        name: 'Alfa Romeo', 
        
    },
    {
        id: 'WIL',
        name: 'Williams F1 Racing', 
        
    },
]

export const drivers = [
    {
        id: 'HAM',
        name: 'Lewis Hamilton', 
        
    },
    {
        id: 'BOT',
        name: 'Valtteri Bottas', 
        
    },
    {
        id: 'VER',
        name: 'Max Verstappen', 
        
    },
    {
        id: 'PER',
        name: 'Sergio Perez', 
        
    },
    {
        id: 'LEC',
        name: 'Charles Leclerc', 
        
    },
    {
        id: 'SAI',
        name: 'Carlos Sainz', 
        
    },
    {
        id: 'NOR',
        name: 'Lando Norris',
        
    },
    {
        id: 'RIC',
        name: 'Daniel Ricciardo', 
        
    },
    {
        id: 'ALO',
        name: 'Fernando Alonso', 
        
    },
    {
        id: 'OCO',
        name: 'Esteban Ocon', 
        
    },    
    {
        id: 'VET',
        name: 'Sebastien Vettel', 
        
    },
    {
        id: 'STR',
        name: 'Lance Stroll', 
        
    },
    {
        id: 'GAS',
        name: 'Pierre Gasly', 
        
    },
    {
        id: 'TSU',
        name: 'Yuki Tsunoda', 
        
    },
    {
        id: 'MSC',
        name: 'Mick Schumacher', 
        
    },    
    {
        id: 'MAZ',
        name: 'Nikita Mazepin', 
        
    },
    {
        id: 'RUS',
        name: 'George Russel', 
        
    },
    {
        id: 'LAT',
        name: 'Nicolas Latifi', 
        
    },
    {
        id: 'RAI',
        name: 'Kimi Raikkonen', 
        
    },
    {
        id: 'GIO',
        name: 'Antonio Giovinazzi', 
        
    },
]


export const driverToTeamMap = {
    HAM: 'MER',
    BOT: 'MER',
    VER: 'RBR',
    PER: 'RBR',
    RIC: 'MCL',
    NOR: 'MCL',
    LEC: 'FER',
    SAI: 'FER',
    VET: 'AMC',
    STR: 'AMC',
    GAS: 'TAU',
    TSU: 'TAU',
    ALO: 'ALP',
    OCO: 'ALP',
    RAI: 'ALF',
    GIO: 'ALF',
    MSC: 'HAS',
    MAZ: 'HAS',
    RUS: 'WIL',
    LAT: 'WIL',
}

export const pace = {
    constructors: {
        MER: 0.0,
        RBR: 0.1,
        MCL: 0.3,
        FER: 0.45,
        TAU: 0.65,
        AMC: 0.7,
        ALP: 0.75,
        ALF: 1.0,
        WIL: 1.2,
        HAS: 1.5
    },
    drivers: {
        HAM: 0,
        BOT: 0.2,
        VER: 0,
        PER: 0.2,
        RIC: 0.1,
        NOR: 0.3,
        LEC: 0.1,
        SAI: 0.2,
        VET: 0.3,
        STR: 0.4,
        GAS: 0.25,
        TSU: 0.4,
        ALO: 0.3,
        OCO: 0.35,
        RAI: 0.4,
        GIO: 0.5,
        MSC: 0.6,
        MAZ: 0.7,
        RUS: 0.3,
        LAT: 0.4
    }
    
}


export const prices = {
    HAM: 33.5,
    BOT: 23.6,
    VER: 24.8,
    PER: 18.4,
    RIC: 17.3,
    NOR: 13.1,
    LEC: 16.8,
    SAI: 14.4,
    VET: 16.2,
    STR: 13.9,
    GAS: 11.7,
    TSU: 8.8,
    ALO: 15.6,
    OCO: 10.1,
    RAI: 9.6,
    GIO: 7.9,
    MSC: 5.8,
    MAZ: 5.5,
    RUS: 6.2,
    LAT: 6.5,
    MER: 38.0,
    RBR: 25.9,
    MCL: 18.9,
    FER: 18.1,
    AMC: 17.6,
    ALP: 15.4,
    HAS: 6.1,
    TAU: 12.7,
    ALF: 8.9,
    WIL: 6.3    
}


export const points = {
    race: [25, 18, 15, 12, 10, 8, 6, 4, 2, 1],
    quali: [10,9,8,7,6,5,4,3,2,1],
}