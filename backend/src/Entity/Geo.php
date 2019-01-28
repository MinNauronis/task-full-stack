<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\GeoRepository")
 * @ORM\Table(name="geos")
 */
class Geo
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="float")
     * @Assert\NotBlank()
     */
    private $lat;

    /**
     * @ORM\Column(type="float")
     * @Assert\NotBlank()
     */
    private $lng;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Address", mappedBy="geo", cascade={"persist", "remove"})
     */
    private $address;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLat(): ?float
    {
        return $this->lat;
    }

    public function setLat(float $lat): self
    {
        $this->lat = $lat;

        return $this;
    }

    public function getLng(): ?float
    {
        return $this->lng;
    }

    public function setLng(float $lng): self
    {
        $this->lng = $lng;

        return $this;
    }

    public function getAddress(): ?Address
    {
        return $this->address;
    }

    public function setAddress(?Address $address): self
    {
        $this->address = $address;

        // set (or unset) the owning side of the relation if necessary
        $newGeo = $address === null ? null : $this;
        if ($newGeo !== $address->getGeo()) {
            $address->setGeo($newGeo);
        }

        return $this;
    }
}
