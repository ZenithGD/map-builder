import React, { createContext, useContext, useState } from "react";

type MapperContextType = {
    initMap: (dimx: number, dimy: number) => boolean;
    createConnection: (x: number, y: number) => boolean;
    deleteConnection: (x: number, y: number) => boolean;
    toggleConnection: (x: number, y: number) => boolean;
    getConnection: (x: number, y: number) => boolean;
    getGridSize: () => {
        x: number;
        y: number;
    };
}

export const MapperContext = createContext<MapperContextType | null>(null);

type ContextProps = {
    children? : React.ReactNode
}

export function MapperContextProvider(props : ContextProps) {
    // map store, will represent connection matrix between cells only, since
    // storing the wall matrix too would be redundant.
    const [dim, setDim] = useState({ x: 3, y : 3 })
    const [map, setMap] = useState<boolean[][]>([]);

    // cell size in mm
    const [cellDim, setCellDim] = useState(400)
    
    /**
     * Initialize connection matrix
     * @param dimx number of cells in x axis
     * @param dimy number of cells in y axis
     * @returns true if array could be initialized (that is, both dimensions are positive), false otherwise
     */
    const initMap = (dimx : number, dimy : number) => {
        if ( dimx < 0 || dimy < 0 ) {
            return false
        }

        setDim({x : dimx, y : dimy})

        let newArr = new Array(dimx)
            .fill(true)
            .map(() => 
            new Array(dimy).fill(true)
            );

        for ( let i = 0; i < dimx; i++ ) {
            for ( let j = 0; j < dimy; j++ ) {
                if (i == 0 || j == 0 || i == dimx - 1 || j == dimy - 1) {
                    newArr[i][j] = false
                }
            }
        }
        setMap(newArr)

        return true
    }

    const setConnection = (x : number, y : number, val : boolean) => {
        if ( x < 0 || x >= dim.x || y < 0 || y >= dim.y ) {
            return false
        }

        let newArr = [ ...map ]
        newArr[x][y] = val
        setMap(newArr)

        return true
    }

    const createConnection = (x : number, y : number) => {
        return setConnection(x, y, true)
    }

    const deleteConnection = (x : number, y : number) => {
        return setConnection(x, y, false)
    }

    const toggleConnection = (x : number, y : number) => {
        return setConnection(x, y, !getConnection(x, y))
    }

    const getConnection = (x : number, y : number) => {
        if ( x < 0 || x >= dim.x || y < 0 || y >= dim.y ) {
            throw new Error("Invalid cell")
        }
        return map[x][y]
    }

    const getGridSize = () => {
        return dim
    }

    const mapperService = {
        initMap,
        createConnection,
        deleteConnection,
        toggleConnection,
        getConnection,
        getGridSize
    }

    return <MapperContext.Provider value={mapperService}>{props.children}</MapperContext.Provider>
}

export function useMapperContext() {
    const context = useContext(MapperContext);
  
    if(!context){
      console.error('Error deploying Mapper Context!');
    }
  
    return context;
}