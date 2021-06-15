<section class="pt-5">
    <form action="index.php?view=calendrier" method="POST">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3 list"></div>
                <div class="col-sm-2 list">
                    <select name="month" id="month" class="form-select btn btn-secondary dropdown-toggle">
                        <option value="" disabled selected>Veuillez choisir un mois</option>
                        <!-- Affichage de tous les mois dans la liste déroulante grâce à un foreach -->
                        <?php foreach ($monthList as $monthNumber => $monthName) : ?>
                            <option value="<?= $monthNumber ?>" <?= (isset($_POST['month']) && $monthNumber ==  $_POST['month'] ? 'selected' : ''); ?>><?= $monthName ?></option>
                        <?php endforeach; ?>
                    </select>
                    <p><?= isset($formError['month']) ? $formError['month']  : ''; ?></p>
                </div>
                <div class="col-sm-2 list">
                    <select name="year" id="year" class="form-select btn btn-secondary dropdown-toggle">
                        <option value="" disabled selected>Veuillez choisir une année</option>
                        <!-- Affichage de tous les années dans la liste déroulante grâce à un for en partant de $firstYear et inférieur $lastYear et en incrémant -->
                        <?php for ($years = $firstYear; $years <= $lastYear; $years++) : ?>
                            <option value="<?= $years ?>" <?= (isset($_POST['year']) && $years ==  $_POST['year'] ? 'selected' : ''); ?>><?= $years ?></option>
                        <?php endfor; ?>
                    </select>
                    <p><?= isset($formError['year']) ? $formError['year']  : ''; ?></p>
                </div>
                <div class="col-sm-2 list">
                    <input type="submit" value="Afficher le calendrier" name="showCalendar" class="btn btn-secondary" />
                </div>
                <div class="col-sm-3 list"></div>
            </div>
        </div>
    </form>
    <!-- Si on parcourt le tableau d'ereeur et qu'il n'y en a pas (mois et année choisis bien sélectionnés) et si on on appuie sur le bouton pour afficher le calendrier, alors le calendrier du mois et de l'année choisis s'affiche -->
    <?php if (count($formError) == 0 && isset($_POST['showCalendar'])) : ?>
        <div class="container-fluid">
            <table>
                <thead>
                    <tr class="calendarTextCenter">
                        <th>Lun</th>
                        <th>Mar</th>
                        <th>Mer</th>
                        <th>Jeu</th>
                        <th>Ven</th>
                        <th>Sam</th>
                        <th>Dim</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <?php $daysInMonth = 2;
                        // Si on prend compte le premier jour jusqu'au 7éme jour inclus en incrémentant 
                        for ($days = 1; $days <= 7; $days++) : ?>
                        <!-- Alors si le premier jour du calendrier est inférieur au premier jour du mois, alors on laisse la cellule du calendrier vide et on affiche le premier dans la cellule du 1er jour du mois -->
                            <td class="<?= $days < $firstDayOfMonth ? 'blank' : '' ?>"><?php if ($days == $firstDayOfMonth) : ?>
                                    1
                                <?php endif;
                                    // Si le premier jour du calendrier est supérieur au premier du mois, alors on incrémente pour remplir le calendrier avec les autres jours selon le nombre de jours dans un mois (avec la fonction date dans le controleur) et on affiche dans un echo
                                    if ($days > $firstDayOfMonth) :
                                        echo $daysInMonth++;
                                    endif;
                                ?></td>
                        <?php endfor; ?>
                    </tr>
                    <!-- Tant que les jours du mois sont inférieur ou égal jusqu'au dernier jour du mois selon le calendrier grégorien (voir contrôleur) -->
                    <?php while ($daysInMonth <= $daysNumberOfMonth) : ?>
                        <tr>
                            <!-- Si on prend compte le premier jour jusqu'au 7éme jour inclus en incrémentant --> 
                            <?php for ($days = 1; $days <= 7; $days++) : ?>
                                <!-- Et si les jours du calendrier sont supérieurs au nombre de jours dans le calendrier grégorien alors on laisse les dernières cellules du calendrier vide puis on incrémente le calendrier pour le remplir -->
                                <td class="<?= $daysInMonth > $daysNumberOfMonth  ? 'blank' : '' ?>"><?php if ($daysInMonth <= $daysNumberOfMonth) : ?>
                                        <?= $daysInMonth++ ?>
                                    <?php endif; ?>
                                </td>
                            <?php endfor; ?>
                        </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
        </div>
    <?php endif; ?>
</section>
<script src="assets/js/calendrier-script.js"></script>