import {DriverStationState} from "../../store";
import {AllianceColour, AllianceStation, UPDATE_ALLIANCE_STATION} from "../../ipc";
import {connect, ConnectedProps} from "react-redux";
import React from "react";

const mapState = (state: DriverStationState) => ({
    alliance: state.alliance
});

const mapDispatch = {
    updateAlliance: (alliance: AllianceStation) => ({type: UPDATE_ALLIANCE_STATION, station: alliance})
};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

function prettyPrint(alliance: AllianceStation): string {
    return alliance.color.toString() + " " + alliance.value
}

function allianceStations(props: Props, close: () => void) {
    let stations = []
    for(let i = 1; i <= 6; i++) {
        if(i <= 3) {
            let stn = { color: AllianceColour.Red, value: i };
            stations.push((<a className="dropdown-item py-1" href="#" onClick={(_) => { props.updateAlliance(stn); close(); }}>{prettyPrint(stn)}</a>))
        } else {
            let stn = { color: AllianceColour.Blue, value: i - 3};
            stations.push((<a className="dropdown-item py-1" href="#" onClick={(_) => { props.updateAlliance(stn); close(); }}>{prettyPrint(stn)}</a>))
        }
    }

    return (
        <>
            {stations}
        </>
    )
}

const AllianceStationSelectorInner = (props: Props) => {
    const [open, setOpen] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!open) return;
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    return (
        <div className="input-group justify-content-center" ref={ref}>
            <div className="input-group-prepend">
                <label htmlFor="teamSelectorDropdown" className="dropdown-label lead font-weight-normal">Team Station </label>
            </div>
            <div className={`dropdown${open ? ' show' : ''}`} id="teamSelectorDropdown">
                <button className="btn btn-secondary dropdown-toggle"
                        type="button" id="dropdownMenuButton"
                        aria-haspopup="true" aria-expanded={open}
                        onClick={() => setOpen(!open)}>
                    {prettyPrint(props.alliance)}
                </button>
                <div className={`dropdown-menu py-1${open ? ' show' : ''}`} aria-labelledby="dropdownMenuButton">
                    {allianceStations(props, () => setOpen(false))}
                </div>
            </div>
        </div>
    );
}

export default connector(AllianceStationSelectorInner)