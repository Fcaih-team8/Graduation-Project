import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { useQuery } from '@tanstack/react-query';
// Make sure fetchThreats is exported from '../../lib/api'
import { fetchThreats } from '../../lib/api';
import { colors } from '../../utils/colors';
import 'leaflet/dist/leaflet.css';

type Threat = {
  id: string | number;
  lat: number;
  lng: number;
  location: string;
  intensity: number;
};

export function ThreatMap() {
  const { data: threats = [] } = useQuery<Threat[]>({
    queryKey: ['threats'],
    queryFn: fetchThreats
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4" style={{ color: colors.primary.main }}>
        Threat Locations
      </h3>
      <div className="h-[400px] rounded-lg overflow-hidden">
        <MapContainer
          center={[20, 0] as [number, number]}
          zoom={2}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {threats.map((threat) => (
            <CircleMarker
              key={threat.id}
              center={[threat.lat, threat.lng] as [number, number]}
              pathOptions={{
                fillColor: colors.severity.high,
                color: colors.severity.high,
                weight: 1,
                opacity: 0.8,
                fillOpacity: 0.4
              }}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold">{threat.location}</p>
                  <p>Threat Level: {(threat.intensity * 100).toFixed(0)}%</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}