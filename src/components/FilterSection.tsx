import { observer } from "mobx-react-lite";
import type { FC } from "react";
import Select from "react-select";
import { ALL, type Controller } from "../viewmodels/controller.viewmodel";

interface Props {
    controller: Controller;
}

interface Option {
    value: string;
    label: string;
}

const toOption = (x: string): Option => ({ value: x, label: x });

export const FilterSection: FC<Props> = observer(({ controller }) => {
    const typeOptions = controller.types.map(toOption);
    const yearOptions = [{ value: ALL, label: "All" }, ...controller.years.map(toOption)];

    const selectedTypeOption = typeOptions.find(o => o.value === controller.selectedType) ?? null;
    const selectedYearOption = yearOptions.find(o => o.value === controller.selectedYear) ?? yearOptions[0];

    return (
        <>
            <Select
                inputId="type"
                options={typeOptions}
                value={selectedTypeOption}
                onChange={option => controller.setType(option?.value ?? null)}
                isClearable
                placeholder="All"
            />


            <Select
                inputId="year"
                options={yearOptions}
                value={selectedYearOption}
                onChange={option => controller.setYear(option?.value ?? ALL)}
            />
        </>
    );

});
