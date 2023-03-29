import React from "react";
import { MapContainer, TileLayer, Polygon, } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { IFigure } from "../../api/types";

interface IHeatmap {
	id: string;
	data: IFigure[];
}

const center : [number, number] = [34.47193441631413, -86.22480383015753];
export const HeatMap: React.FC<IHeatmap> = (props) => { 

	const { id, data } = props;

	const polygons2 : any[] = [];
	data.map((dataPoint) => {
		if (dataPoint.parsedFigure?.type == 'Polygon') {
			polygons2.push(dataPoint.parsedFigure?.coordinates[0])
		} else if (dataPoint.parsedFigure?.type == 'MultiPolygon') {
			dataPoint.parsedFigure?.coordinates.map((polygon) => {
				polygons2.push(polygon[0])
			})
		}
	})

	return (
        <MapContainer
			id={id}
			center={center}
			zoom={3}
			style={{ width: '70vw', height: '70vh'}}
		>
			<TileLayer
				url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=M0F2SUMaiH8ZxDsyfoje"
				attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
			/>
			{
				
				polygons2.map((polygon) => {

					const coordinates = polygon.map(item => [item[1], item[0]]);

					return (
						<Polygon
							pathOptions={{
								fillColor: '#3042fe',
								fillOpacity: 0.7,
								weight: 2,
								opacity: 1,
								dashArray: [3],
								color: 'white'
							}}
							positions={coordinates}
						/>
					)
				})
			}
		</MapContainer>
	);
	
}