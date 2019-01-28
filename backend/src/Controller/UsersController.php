<?php

namespace App\Controller;

use App\Entity\User;
use App\Services\UserService;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Routing\ClassResourceInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * Class UserController
 *
 * @package App\Controller
 */
class UsersController extends AbstractController implements ClassResourceInterface
{

    private $entityManager;
    private $userService;

    public function __construct(EntityManagerInterface $entityManager, UserService $userService)
    {
        $this->entityManager =$entityManager;
        $this->userService = $userService;
    }

    /**
     * @Rest\Get("/users/{id}")
     * @param User $user
     * @return JsonResponse
     */
    public function getAction(User $user)
    {
        return new JsonResponse($user, JsonResponse::HTTP_OK);
    }

    public function cgetAction()
    {
        $users = $this->userService->getAll();

        return new JsonResponse($users, JsonResponse::HTTP_OK);
    }

    /**
     * @Rest\Post("/users")
     * @param Request $request
     * @return JsonResponse
     */
    public function postAction(Request $request)
    {
        $data = $request->request->all();
        $user = $this->userService->create($data);


        return new JsonResponse($user, JsonResponse::HTTP_CREATED);
    }

    /**
     * @Rest\Put("/users/{id}")
     * @param Request $request
     * @param User $user
     * @return JsonResponse
     * @throws \Doctrine\ORM\EntityNotFoundException
     */
    public function putAction(Request $request, User $user)
    {
        $data = $request->request->all();
        $user = $this->userService->update($data, $user);

        return new JsonResponse($user, JsonResponse::HTTP_OK);
    }

    /**
     * @Rest\Delete("/users/{id}")
     * @param int $id
     * @return JsonResponse
     * @throws \Doctrine\ORM\EntityNotFoundException
     */
    public function deleteAction(int $id)
    {
        $this->userService->delete($id);

        return new JsonResponse('', JsonResponse::HTTP_NO_CONTENT);
    }
}
