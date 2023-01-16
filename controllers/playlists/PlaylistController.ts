import { Response, Request } from "express";
import ApiResponse from "../../libs/ApiResponse";
import PlaylistSingleton from "../../libs/Playlist";
import DatabaseSingleton from "../../prisma/DatabaseSingleton";

const db = DatabaseSingleton.getDb()

const PlaylistController = {
    getPlaylists: async (request: Request, response: Response) => {

        try {

            const playlists = await PlaylistSingleton
                                                    .playlistInstance()
                                                    .getPlaylists(request.user.id)

            if(!playlists) throw new Error("failed to retrieve playlists")

            response.status(200).json(
                ApiResponse(false, "playlists compiled", {playlists: playlists})
            )
            
        } catch (e: any) {
            response.status(500).json(
                ApiResponse(true, e.message, e)
            )
        }

    },
    getPlaylistTracks: async (request: Request, response: Response) => {

        try{

            const { id } = request.params

            const playlistWithTracks = await PlaylistSingleton
                                                            .playlistInstance()
                                                            .getPlaylistTracks({playlistId: id, userId: request.user.id})
            
            if(!playlistWithTracks) throw new Error("failed to retrieve playlist with its tracks")

            response.status(200).json(
                ApiResponse(false, "playlist with its tracks compiled", {playlist: playlistWithTracks})
            )

        }catch(e: any){
            response.status(200).json(
                ApiResponse(true, e.message, e)
            )
        }

    },
    createPlaylist: async (request: Request, response: Response) => {

        try {

            const { name } = request.body
            const playlistData: {name: string, userId: string} = {name: name, userId: request.user.id}

            // playlist can have the same name but users should be different
            const c = await db.playlist.count({
                where: playlistData
            })

            if(c > 0) throw new Error(`You already have a playlist with this name: ${name}`)
            
            const playlist = await PlaylistSingleton
                                            .playlistInstance()
                                            .createPlaylist(playlistData)

            if(!playlist) throw new Error("Failed to create a new playlist")

            response.status(200).json(
                ApiResponse(true, `Playlist "${name}" created!`, {playlist: playlist})
            )

        } catch (e: any) {
            response.status(500).json(
                ApiResponse(true, e.message, e)
            )
        }
        
    },
    addTrackToPlaylist: async (request: Request, response: Response) => {

        try{

            const { playlistId, trackId } = request.body

            // Could let prisma catch constraint errors but I wanted to control the narrative??
            if(
               await db.track.count({where: {id: trackId}}) == 0
            ) throw new Error(`This "${trackId}" track does not exist `)

            if(
                await db.playlist.count({where: {id: playlistId}}) == 0
             ) throw new Error(`This "${playlistId}" playlist does not exist `)

             const addTrack = await PlaylistSingleton
                                                    .playlistInstance()
                                                    .addTrackToPlaylist({playlistId: playlistId, trackId: trackId})

            if(!addTrack) throw new Error("Failed to add track to playlist")

            response.status(200).json(
                ApiResponse(false, "Added track to playlist", {playlistTrack: addTrack})
            )
                                                    
        }catch(e: any){
            response.status(500).json(
                ApiResponse(true, e.message, e)
            )
        }

    },
    deletePlaylist: async (request: Request, response: Response) => {
        
        try {
            
            const { id } = request.params

            const deletedPlaylist = await PlaylistSingleton
                                                          .playlistInstance()
                                                          .deletePlaylist(id)

            if(!deletedPlaylist) throw new Error("Failed to delete playlist")

            response.status(200).json(
                ApiResponse(false, "Playlist deleted", {playlist: deletedPlaylist})
            )

        } catch (e: any) {
            response.status(500).json(
                ApiResponse(true, e.message, e)
            )
        }

    },
    deletePlaylistTrack: async (request: Request, response: Response) => {
        
        try {

            const {id} = request.body

            const deletedPlaylistTrack = await PlaylistSingleton
                                                                .playlistInstance()
                                                                .deletePlaylistTrack(id)

            if(!deletedPlaylistTrack) throw new Error("Failed to delete track from playlist")

            response.status(200).json(
                ApiResponse(false, "Track deleted from playlist", {track: deletedPlaylistTrack})
            )
            
        } catch (e: any) {
            response.status(500).json(
                ApiResponse(true, e.message, e)
            )
        }
    }
}

export default PlaylistController