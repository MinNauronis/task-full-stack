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
use Symfony\Component\HttpFoundation\Response;
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
    private $responseHeaders = [];

    public function __construct(EntityManagerInterface $entityManager, UserService $userService)
    {
        $this->entityManager = $entityManager;
        $this->userService = $userService;

        $this->responseHeaders[] = ['Content-type' => 'application/json'];
    }

    /**
     * @Rest\Get("/users/{id}")
     * @param User $user
     * @return Response
     */
    public function getAction(int $id)
    {
        $user = $this->userService->get($id);

        $response = $this->userService->serialize($user);

        return new Response($response, JsonResponse::HTTP_OK, $this->responseHeaders);
    }

    public function cgetAction()
    {
        $users = $this->userService->getAll();

        $response = [];
        foreach ($users as $user) {
            $response[] = $this->userService->serialize($user);
        }

        $response = '['.implode(",\n",$response).']';

        return new Response($response, JsonResponse::HTTP_OK, $this->responseHeaders);
    }

    /**
     * @Rest\Post("/users")
     * @param Request $request
     * @return Response
     */
    public function postAction(Request $request)
    {
        $data = $request->request->all();
        $user = $this->userService->create($data);

        $response = $this->userService->serialize($user);

        return new Response($response, JsonResponse::HTTP_CREATED, $this->responseHeaders);
    }

    /**
     * @Rest\Put("/users/{id}")
     * @param Request $request
     * @param User $user
     * @return Response
     * @throws \Doctrine\ORM\EntityNotFoundException
     */
    public function putAction(Request $request, User $user)
    {
        $data = $request->request->all();
        $this->userService->update($data, $user);

        $response = $this->userService->serialize($user);

        return new Response($response, JsonResponse::HTTP_OK, $this->responseHeaders);
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
