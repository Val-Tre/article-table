export interface TypeGridProps {
    width: number;
    height: number;
    speed: number;
    life: number;
}

export enum CellState {
    DEAD = 0,
    ALIVE = 1,
}

export interface TypeButtonProps {
    text: string;
    onClick: () => void;
}

export interface TypeDropdownProps {
    label: string;
    valuesArray: number[];
    defaultValue: number;
    type: "width" | "height" | "speed" | "life";
    onChange: (property: string, value: number) => void;
}
