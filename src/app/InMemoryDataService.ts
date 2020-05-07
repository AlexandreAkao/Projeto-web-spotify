import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, STATUS, ResponseOptions } from 'angular-in-memory-web-api';

import playlist from '../app/playlist/Playlist';
import musicMock from '../app/Music/MusicMock';
import usuario from '../app/usuario/Usuario';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const playlists: playlist[] = [
      new playlist(
        0,
        'When We All Fall Asleep, Where Do We Go?',
        '../../../assets/img/album/When_We_Fall_Asleep,_Where_Do_We_Go.png',
        'Billie Eilish',
        1,
        [
          musicMock[0], musicMock[1], musicMock[2]
        ]
      ),
      new playlist(
        1,
        'The Days / Nights',
        '../../../assets/img/album/the_days_nights.png',
        'Avicii',
        1,
        [
          musicMock[3], musicMock[4]
        ]
      ),
      new playlist(
        2,
        'Curtain Call',
        '../../../assets/img/album/eminem_curtain_call.jpg',
        '',
        1,
        [
          musicMock[5]
        ]
      ),
      new playlist(
        3,
        'Castelos & Ruínas',
        '../../../assets/img/album/bk.webp',
        '',
        1,
        [
          musicMock[5]
        ]
      ),
      new playlist(
        4,
        'All Eyez On Me',
        '../../../assets/img/album/2pac.jpg',
        '',
        1,
        [
          musicMock[5]
        ]
      ),
      new playlist(
        5,
        'DAMN',
        '../../../assets/img/album/Kendrick_Lamar.jpg',
        '',
        1,
        [
          musicMock[5]
        ]
      ),
      new playlist(
        6,
        'Doka Language',
        '../../../assets/img/album/sidoka.jfif',
        '',
        1,
        [
          musicMock[5]
        ]
      ),
      new playlist(
        7,
        'Recess',
        '../../../assets/img/album/recess.jfif',
        'Skrillex',
        1,
        [
          musicMock[6], musicMock[7], musicMock[8],
          musicMock[9], musicMock[10], musicMock[11],
          musicMock[12], musicMock[13], musicMock[14]
        ]
      )
    ];

    const usuarios: usuario[] = [
      {
        id: 0,
        username: "a",
        email: "a",
        senha: "a",
        sexo: "masculino",
        dataDeNascimento: new Date(12335)
      }
    ];

    const session: usuario[] = [

    ]

    return { playlists, usuarios, session };
  }

  post(reqInfo: RequestInfo) {
    if (reqInfo.collectionName === 'session') {
      return this.authenticate(reqInfo)
    }

    return undefined
  }


  private authenticate(reqInfo: RequestInfo) {

    return reqInfo.utils.createResponse$(() => {
      const { headers, url, req } = reqInfo

      let users = this.createDb().usuarios;
      console.log(users)
      const { username, password } = req['body']

      if (users.some(item => (item.username === username || item.email === username))) {
        users = users.filter(
          item => (item.senha === password && (item.username === username || item.email === username))
        );

        if (users.length !== 0) {

          return {
            status: 201,
            headers,
            url,
            body: {
              user: users[0]
            }
          }
        } else {
          return {
            status: 401,
            headers,
            url,
            body: {
              error: "Não autorizado"
            }
          }
        }
      } else {
        return {
          status: 404,
          headers,
          url,
          body: {
            error: "Usuario não encontrado"
          }
        }
      }
    })
  }
}
