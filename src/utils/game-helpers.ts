





//Formatear fchas de igdb a una mas legible
export const formatDate = (timestamp: number | undefined | null)=>{
    if(!timestamp) return "Desconocida";
    return new Date(timestamp * 1000).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
}

//Formatear cover de igb a una url completa y con el tamaño correcto
export const formatCoverUrl = ( url: string  | undefined | null) => {
    if(!url) return "/placeholder.png"
    return `https:${url.replace("t_thumb", "t_cover_big")}`;

}