<?php

namespace App\Services;


use App\Entity\Address;
use App\Entity\Company;
use App\Entity\Geo;
use App\Entity\User;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityNotFoundException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Zend\Code\Exception\BadMethodCallException;

class UserService
{
    private $entityManager;
    private $userRepository;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->userRepository = $entityManager->getRepository(User::class);
    }

    /**
     * Create user object from given data
     * @param array $data
     * @return User
     */
    public function create(array $data): User
    {
        $user = $this->setUser($data);

        $this->entityManager->persist($user);

        try {
            $this->entityManager->flush();
        } catch (UniqueConstraintViolationException $e) {
            throw new BadRequestHttpException('Email already taken', $e, 400);
        }

        return $user;
    }

    /**
     * Create new or update user
     * @param array $data
     * @param User|null $user
     * @return User
     */
    private function setUser(array $data, User $user = null): User
    {
        if (!$user) {
            $user = new User();
        }

        foreach ($data as $key => $value) {

            $method = $this->getSetterMethodName($key);

            if ($key === 'id') {
                continue;
            }

            if ($key === 'address') {
                $value = $this->setAddress($value, $user->getAddress());
            }

            if ($key === 'company') {
                $value = $this->setCompany($value, $user->getCompany());
            }

            if (!method_exists($user, $method)) {
                throw new BadMethodCallException('Incorrect parameter: ' . $key);
            }
            $user->{$method}($value);
        }

        return $user;
    }

    /**
     * Convert given name to setter
     * @param string $name
     * @return string
     */
    private function getSetterMethodName(string $name)
    {
        return 'set' . ucfirst($name);
    }

    /**
     * Create new or update address
     * @param array $data
     * @param Address|null $address
     * @return Address
     */
    private function setAddress(array $data, Address $address = null): Address
    {
        if (!$address) {
            $address = new Address();
        }

        foreach ($data as $key => $value) {

            $method = $this->getSetterMethodName($key);

            if ($key === 'id') {
                continue;
            }

            if ($key === 'geo') {
                $value = $this->setGeo($value, $address->getGeo());
            }

            if (!method_exists($address, $method)) {
                throw new BadMethodCallException('Incorrect parameter of address: ' . $key);
            }

            $address->{$method}($value);
        }

        $this->entityManager->persist($address);

        return $address;
    }

    /**
     * Create new or update geo
     * @param array $data
     * @param Geo|null $geo
     * @return Geo
     */
    private function setGeo(array $data, Geo $geo = null): Geo
    {
        if (!$geo) {
            $geo = new Geo();
        }

        foreach ($data as $key => $value) {

            $method = $this->getSetterMethodName($key);

            if ($key === 'id') {
                continue;
            }

            if (!method_exists($geo, $method)) {
                throw new BadMethodCallException('Incorrect parameter of geo: ' . $key);
            }

            $geo->{$method}($value);
        }

        $this->entityManager->persist($geo);

        return $geo;
    }

    /**
     * Create new or update company
     * @param array $data
     * @param Company|null $company
     * @return Company
     */
    private function setCompany(array $data, Company $company = null): Company
    {
        if (!$company) {
            $company = new Company();
        }

        foreach ($data as $key => $value) {

            $method = $this->getSetterMethodName($key);

            if ($key === 'id') {
                continue;
            }

            if (!method_exists($company, $method)) {
                throw new BadMethodCallException('Incorrect parameter of company: ' . $key);
            }

            $company->{$method}($value);
        }

        $this->entityManager->persist($company);

        return $company;
    }

    /**
     * Return User by id
     * @param int $userId
     * @return User|null
     */
    public function get(int $userId): ?User
    {
        return $this->userRepository->find($userId);
    }

    /**
     * Return all objects of User
     * @return array|null
     */
    public function getAll(): ?array
    {
        return $this->userRepository->findAll();
    }

    /**
     * Delete user by id
     * @param int $userId
     * @throws EntityNotFoundException
     */
    public function delete(int $userId): void
    {
        $user = $this->userRepository->find($userId);

        if (!$user) {
            throw new EntityNotFoundException('User not found', 404);
        }

        $company = $user->getCompany();
        $address = $user->getAddress();
        $geo = $address->getGeo();

        if ($geo) {
            $this->entityManager->remove($geo);
        }

        if ($address) {
            $this->entityManager->remove($address);
        }

        if ($company) {
            $this->entityManager->remove($company);
        }

        $this->entityManager->remove($user);
        $this->entityManager->flush();
    }

    /**
     * Update user by given data
     * @param array $data
     * @param User|int $user
     * @throws EntityNotFoundException
     */
    public function update(array $data, $user)
    {
        if (!$user instanceof User) {
            $user = $this->userRepository->find($user);
        }

        if (!$user) {
            throw new EntityNotFoundException('User not found', 404);
        }

        $user = $this->setUser($data, $user);

        try {
            $this->entityManager->flush();
        } catch (UniqueConstraintViolationException $e) {
            throw new BadRequestHttpException('Email already taken', $e, 400);
        }
    }

}