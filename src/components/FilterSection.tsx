import type { FC } from "react";
import type { Controller } from "../viewmodels/controller.viewmodel";

interface Props {
    controller: Controller;
}

export const FilterSection: FC<Props> = ({ controller }) => {
    const options = controller.types.map(x => <option key={x} value={x}>{x}</option>)
    return (
        <>
            <select value={controller.selectedType ?? undefined} onChange={e => controller.setType(e.target.value ?? null )}>
                <option value="">All</option>
                {options}
            </select>
        </>
    );
        
}