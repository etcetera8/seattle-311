import { observer } from "mobx-react-lite";
import type { FC } from "react";
import type { Controller } from "../viewmodels/controller.viewmodel";

interface Props {
    controller: Controller;
}

export const FilterSection: FC<Props> = observer(({ controller }) => {
    const options = controller.types.map(x => <option key={x} value={x}>{x}</option>)
    const yearOptions = controller.years;

    return (
        <>
            <select id="type" value={controller.selectedType ?? undefined} onChange={e => controller.setType(e.target.value ?? null )}>
                <option value="">All</option>
                {options}
            </select>

            <select id="year" value={controller.selectedYear ?? undefined} onChange={(e) => controller.setYear(e.target.value)}>
                <option value="All">All</option>
                {Object.keys(yearOptions).map(x => <option key={x} value={x}>{x}</option>)}
            </select>

        </>
    );

});