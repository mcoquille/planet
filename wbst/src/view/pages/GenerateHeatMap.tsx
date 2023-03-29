import React, { useState, useEffect} from "react";
import { 
    Grid, 
    FormControl, 
    InputLabel, 
    MenuItem, 
    Select, 
    CircularProgress,
    OutlinedInput,
    Checkbox,
    ListItemText
} from "@mui/material";
import { HeatMap } from "../components";
import api from "../../api";
import { IFigure } from "../../api/types";
import { parse } from 'wkt';

export const GenerateHeatMap: React.FC<{}> = () => {

    const [ orgIds, setOrgIds ] = useState<number[]>([]);
    const [ figures, setFigures ] = useState<IFigure[]>([]);

    const [selectedOrgIds, selectOrgIds] = React.useState<number[]>([]);
    const [ selectedFigures, selectFigures ] = React.useState<IFigure[]>([]);

    const handleOrgIdsSelection = (event) => {
        const value = event.target.value;
        selectOrgIds(value);
    };

    const changeFigureSelection = () => {
        if (selectedOrgIds.length === 0) {
            selectFigures(figures);
        } else {
            const newlySelectedFigures : IFigure[] = [];
            figures.forEach(figure => {
                if (figure[1] in selectedOrgIds) {
                    newlySelectedFigures.push(figure)
                }
            })
            selectFigures(selectedFigures)
        }
    }

    const getOrgIds = async () => {
        const orgIds = await api.figures.getOrgIds();
        setOrgIds(orgIds)
        
    };

    const getFigures = async () => {
        const figures = await api.figures.getFigures();
        figures.forEach(figure => {
            figure.parsedFigure = parse(figure[2])
        })
        setFigures(figures)
        selectFigures(figures)
    }
    
    useEffect(() => {
        getOrgIds()
        getFigures()
    }, [])

    useEffect(() => {
        changeFigureSelection()
    }, [selectedOrgIds])

    return (
        <Grid container spacing={2} id='main-container'>

            <Grid item xs={12}>
                Heat Maps
            </Grid>

            <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel >IDs of organisation</InputLabel>
                    <Select
                        multiple
                        value={selectedOrgIds}
                        onChange={handleOrgIdsSelection}
                        input={<OutlinedInput label="IDs of organizations" />}
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {orgIds.map((orgId) => (
                            <MenuItem key={orgId} value={orgId}>
                            <Checkbox checked={selectedOrgIds.indexOf(orgId) > -1} />
                            <ListItemText primary={orgId} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl> 
            </Grid>

            <Grid item xs={12}>
                {
                    selectedFigures.length > 0 ?  
                    <HeatMap id='heatmap' data={selectedFigures} />
                    : <CircularProgress />
                }
            </Grid>
        </Grid>    
    ) 
}
