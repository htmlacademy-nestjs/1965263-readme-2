//------------------------------------------------------USERS-------------------------------------------------------
//==================================================================================================================
// Регистрация пользователя
// POST /auth/register
/* 
  request body:
    {
      email: string;
      firstName: string;
      lastName: string;
      password: string;
      avatar?: string;
    }
    +=
    {
      system _id: string;
      system createdAt: string;
    }
    +=
    {
      postsCount: number; {initial value 0}
      subscribersCount: number; {initial value 0}
    }

  response:
    {
      id: string;
      email: string;
    }
*/
//==================================================================================================================
// Авторизация пользователя
// POST /auth/login
/* 
  request body:
    {
      email: string;
      password: string;
    }

  response:
    {
      token: string;
    }
*/
//==================================================================================================================
// Проверка авторизации пользователя
// GET /auth/login
/* 
  response:
    {
      email: string;
      firstName: string;
      lastName: string;
      password: string;
      avatar: string;
    }
*/
//==================================================================================================================
// Изменение пароля
// PATCH /auth/passchange
/* 
  request body:
    {
      currentPassword: string;
      newPassword: string;
    }

  response: ???????????????????????????????????????????????????????????????????????????????????????????????????????
*/
//==================================================================================================================
// Получение детальной информации о пользователе (имплементировать только в auth ?)
// GET /auth/:userId
/* 
  response:
    {
      createdAt: string;
      postsCount: number;
      subscribersCount: number;
      id: string;
    }
*/
//==================================================================================================================
// Подписка на пользователя
// POST /users/:userId/subscribe
//==================================================================================================================
// Отписка от пользователя
// POST /users/:userId/unsubscribe
//==================================================================================================================

//------------------------------------------------------POSTS-------------------------------------------------------
//==================================================================================================================
// Запрос публикаций {только 25 новейших публикаций}
// GET /posts
//==================================================================================================================
// Запрос публикаций {следующие 25 публикаций} (пагинация)
// GET /posts/more
//==================================================================================================================
// Запрос публикаций определённого юзера {только 25 новейших публикаций}
// GET /posts/user/:id
//==================================================================================================================
// Запрос публикаций определённого юзера {следующие 25 публикаций} (пагинация)
// GET /posts/user/:id/more
//==================================================================================================================
// Запрос публикаций по определённому тегу
// GET /posts/:tag
//==================================================================================================================
// Создание публикации типа видео
// POST /posts/video
/* 
  request body:
    {
      title: string;
      url: string;
      tags?: string[];
    }
    +=
    {
      system _id: number;
      system createdAt: string;
      system date: string;
      type: video
    }

  response:
    {
      _id: number;
      createdAt: string;
      date: string; -------------------> сортировать по этому полю (дата публикации п. 3.6), при репосте тоже меняется это поле
      isPublished: boolean;
      likesCount: number;
      commentsCount: number;
      type: string;

      title: string;
      url: string;
      tags?: string[];

      isRepost: boolean;
      author: {
        id
        firstName
        lastName
        email
      }
      ??????????????????????originalAuthor: string;
      ??????????????????????originalId: number; -------------> id оригинальной публикации
    }
*/
//==================================================================================================================
// Создание публикации типа текст
// POST /posts/text
/* 
  request body:
    {
      title: string;
      announcement: string;
      text: string;
      tags?: string[];
    }
    +=
    {
      system _id: number;
      system createdAt: string;
      system date: string;
      type: text
    }

  response: ???????????????????????????????????????????????????????????????????????????????????????????????????????
*/
//==================================================================================================================
// Создание публикации типа цитата
// POST /posts/quote
/* 
  request body:
    {
      text: string;
      author: string;
      tags?: string[];
    }
    +=
    {
      system _id: number;
      system createdAt: string;
      system date: string;
      type: quote
    }

  response: ???????????????????????????????????????????????????????????????????????????????????????????????????????
*/
//==================================================================================================================
// Создание публикации типа фото
// POST /posts/photo
/* 
  content: *.jpg, *.png
  request body:
    {
      tags?: string[];
    }
    +=
    {
      system _id: number;
      system createdAt: string;
      system date: string;
      type: photo
    }

  response: ???????????????????????????????????????????????????????????????????????????????????????????????????????
*/
//==================================================================================================================
// Создание публикации типа ссылка
// POST /posts/link
/* 
  request body:
    {
      url: string;
      description?: string;
      tags?: string[];
    }
    +=
    {
      system _id: number;
      system createdAt: string;
      system date: string;
      type: link
    }

  response: ???????????????????????????????????????????????????????????????????????????????????????????????????????
*/
//==================================================================================================================
// Редактирование публикации
// PATCH /posts/:id/
//==================================================================================================================
// Добавление/удаление лайков ??????????????????????????????????????????????????????????????????????????????????????
// PATCH /posts/:id/
//==================================================================================================================
// Удаление публикации
// DELETE /posts/:id
//==================================================================================================================
// Репост публикации
// PATCH /posts/:id/
//==================================================================================================================

//----------------------------------------------------COMMENTS------------------------------------------------------
//==================================================================================================================
// Создание комментария
// POST /comments/:postId
/* 
  request body:
    {
      text: string;
    }

  response:
    {
      text: string;
      postId: number;
    }
    +=
    {
      system _id: number;
      system createdAt: string;
      system userId: string; ???????????????????????????????????????????????????????????????????????????????????
    }
*/
//==================================================================================================================
// Получение списка комментариев к публикации {первые 50}
// GET /comments/:postId
/*  */
//==================================================================================================================
// Получение списка комментариев к публикации {следующие 50}
// GET /comments/:postId/more
/*  */
//==================================================================================================================
// Удаление комментария
// DELETE /comments/:commentId
/*  */
//==================================================================================================================
