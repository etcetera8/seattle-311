import { observer } from "mobx-react-lite";
import type { FC } from "react";
import { ALL, type Controller } from "../viewmodels/controller.viewmodel";

interface Props {
    controller: Controller;
}

export const FilterSection: FC<Props> = observer(({ controller }) => {
    const options = controller.types.map(x => <option key={x} value={x}>{x}</option>)
    const yearOptions = controller.years.map(x => <option key={x} value={x}>{x}</option>)

    return (
        <>
            <select id="type" value={controller.selectedType ?? ""} onChange={e => controller.setType(e.target.value)}>
                <option value="">All</option>
                {options}
            </select>

            <select id="year" value={controller.selectedYear} onChange={(e) => controller.setYear(e.target.value)}>
                <option value={ALL}>All</option>
                {yearOptions}
            </select>

        </>
    );

});