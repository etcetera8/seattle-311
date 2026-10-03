import { observer } from "mobx-react-lite";
import type { FC } from "react";
import Select, { type MultiValue } from "react-select";
import type { Controller } from "../viewmodels/controller.viewmodel";

interface Props {
    controller: Controller;
}

interface Option {
    value: string;
    label: string;
}

const toOption = (x: string): Option => ({ value: x, label: x });

const portalStyles = { menuPortal: (base: object) => ({ ...base, zIndex: 10 }) };

export const FilterSection: FC<Props> = observer(({ controller }) => {
    const typeOptions = controller.types.map(toOption);
    const yearOptions = controller.years.map(toOption);

    const selectedTypeOption = typeOptions.find(o => o.value === controller.selectedType) ?? null;

    const selectedYearOptions = yearOptions.filter(o => controller.selectedYears.includes(o.value))
    const handleMultiChange = (selected: MultiValue<Option>) => {
        const values = selected.map(x => x.value)
        controller.setYears(values)
    }
    return (
        <>
            <label className="filter-field">
                <span>Request Category</span>
                <Select
                    inputId="type"
                    options={typeOptions}
                    value={selectedTypeOption}
                    onChange={option => controller.setType(option?.value ?? null)}
                    isClearable
                    placeholder="All"
                    menuPortalTarget={document.body}
                    styles={portalStyles}
                />
            </label>

            <label className="filter-field">
                <span>Year</span>
                <Select
                    isMulti
                    inputId="year"
                    options={yearOptions}
                    value={selectedYearOptions}
                    onChange={handleMultiChange}
                    placeholder="All"
                    menuPortalTarget={document.body}
                    styles={portalStyles}
                />
            </label>

            <p>{controller.filteredData.length.toLocaleString()} requests</p>
        </>
    );

});
