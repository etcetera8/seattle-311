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

const portalStyles = { menuPortal: (base: object) => ({ ...base, zIndex: 10 }) };

export const FilterSection: FC<Props> = observer(({ controller }) => {
    const typeOptions = controller.types.map(toOption);
    const yearOptions = [{ value: ALL, label: "All" }, ...controller.years.map(toOption)];

    const selectedTypeOption = typeOptions.find(o => o.value === controller.selectedType) ?? null;
    const selectedYearOption = yearOptions.find(o => o.value === controller.selectedYear) ?? yearOptions[0];

    return (
        <>
            <label className="filter-field">
                <span>Request type</span>
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
                    inputId="year"
                    options={yearOptions}
                    value={selectedYearOption}
                    onChange={option => controller.setYear(option?.value ?? ALL)}
                    menuPortalTarget={document.body}
                    styles={portalStyles}
                />
            </label>

            <p>{controller.filteredData.length.toLocaleString()} requests</p>
        </>
    );

});
