</div>
</div>
))}
</div>
</div>
{/* left column */}
<div className="bg-white w-3/5 border border-slate-300"></div>
<div className="bg-white h-full w-3/5 border border-slate-300">
{/* Google Maps */}
{isLoaded && (
<GoogleMap
center={marker}
zoom={20}
mapContainerStyle={{ width: "100%", height: "100%" }}
>
<Marker position={marker} />
</GoogleMap>
)}
</div>
</div>
</div>
);