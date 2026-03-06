<?php

class Course
{
    private $pdo;
    private $table = 'cursos';

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function all($search = '')
    {
        // alias columns back to english names for frontend compatibility
        $fields = "id, titulo AS title, descricao AS description, miniatura AS thumbnail, banner, link, selo AS badge, imagens AS images, criado_em AS created_at, atualizado_em AS updated_at";
        if ($search !== '') {
            $stmt = $this->pdo->prepare("SELECT {$fields} FROM {$this->table} WHERE titulo LIKE :search ORDER BY id ASC");
            $stmt->execute(['search' => "%$search%"]);
        } else {
            $stmt = $this->pdo->query("SELECT {$fields} FROM {$this->table} ORDER BY id ASC");
        }
        return $stmt->fetchAll();
    }

    public function find($id)
    {
        $fields = "id, titulo AS title, descricao AS description, miniatura AS thumbnail, banner, link, selo AS badge, imagens AS images, criado_em AS created_at, atualizado_em AS updated_at";
        $stmt = $this->pdo->prepare("SELECT {$fields} FROM {$this->table} WHERE id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }

    public function create($data)
    {
        $sql = "INSERT INTO {$this->table} (titulo, descricao, miniatura, banner, link, selo, imagens)
                VALUES (:title, :description, :thumbnail, :banner, :link, :badge, :images)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            'title' => $data['title'] ?? null,
            'description' => $data['description'] ?? null,
            'thumbnail' => $data['thumbnail'] ?? null,
            'banner' => $data['banner'] ?? null,
            'link' => $data['link'] ?? null,
            'badge' => $data['badge'] ?? null,
            'images' => isset($data['images']) ? json_encode($data['images']) : null,
        ]);
        return $this->find($this->pdo->lastInsertId());
    }

    public function delete($id)
    {
        $stmt = $this->pdo->prepare("DELETE FROM {$this->table} WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }
}
